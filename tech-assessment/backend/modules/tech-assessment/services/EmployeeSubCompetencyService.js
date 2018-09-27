/**
 * This service provides operations to manage EmployeeSubCompetency.
 */
const Joi = require('joi');
const co = require('co');
const { Op } = require('sequelize');
const _ = require('lodash');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const { BadRequestError, ForbiddenError } = require('../../../common/errors');
const {
  sequelize, Employee, Competency, SubCompetency,
  SubCompetencyLevel, EmployeeSubCompetency, Activity, CompletedActivity
} = require('../models');

/**
 * Validate a connection.
 * @param {String} employeeEID the employee EID
 * @param {Number} competencyId the competency id
 * @param {Number} subCompetencyId the sub competency id
 * @param {Object} payload the payload
 * @param {Object} transaction the transaction
 * @private
 */
function* validateConnection(employeeEID, competencyId, subCompetencyId, payload, transaction) {
  if (employeeEID) {
    yield helper.ensureExist(
      Employee, { where: { EID: employeeEID }, transaction },
      `Employee does not exist with EID=${employeeEID}`, true
    );
  }
  const competency = yield helper.ensureExist(
    Competency, { where: { id: competencyId }, transaction },
    `Competency does not exist with id=${competencyId}`, true
  );
  const subCompetency = yield helper.ensureExist(
    SubCompetency, { where: { id: subCompetencyId }, transaction },
    `SubCompetency does not exist with id=${subCompetencyId}`, true
  );
  if (payload.currentMaturity) {
    const subCompetencyLevel = yield helper.ensureExist(
      SubCompetencyLevel, { where: { subCompetencyId, level: payload.currentMaturity }, transaction },
      `SubCompetencyLevel does not exist with id=${payload.currentMaturity}`, true
    );
    if (subCompetencyLevel.createdBy !== payload.updatedBy) {
      throw new ForbiddenError('You are not allowed to access this sub competency level');
    }
  }
  if (payload.expectedMaturity) {
    const subCompetencyLevel = yield helper.ensureExist(
      SubCompetencyLevel, { where: { subCompetencyId, level: payload.expectedMaturity }, transaction },
      `SubCompetencyLevel does not exist with id=${payload.expectedMaturity}`, true
    );
    if (subCompetencyLevel.createdBy !== payload.updatedBy) {
      throw new ForbiddenError('You are not allowed to access this sub competency level');
    }
  }
  if (payload.currentMaturity > payload.expectedMaturity) {
    throw new BadRequestError('Current Maturity cannot be greater than expected Maturity');
  }
  if (competency.createdBy !== payload.updatedBy) {
    throw new ForbiddenError('You are not allowed to access this competency');
  }
  if (subCompetency.createdBy !== payload.updatedBy) {
    throw new ForbiddenError('You are not allowed to access this sub competency');
  }
  if (subCompetency.competencyId !== competencyId.toString()) {
    throw new BadRequestError('The specified sub competency does not belong to the competency');
  }
}

/**
 * Helper function to update completed activities of employee
 * @param {String} employeeEID the employee EID
 * @param {String} currentUserEID the current user id
 * @param {String} subCompetencyId the subCompetency id
 * @param {String} level the current maturity
 * @param {String} expectedMaturity the expected maturity
 * @param {String} transaction the transation
 */
function* completeActivities(employeeEID, currentUserEID, subCompetencyId, level, expectedMaturity, transaction) {
  // Mark all activities from all previous levels prior to currentMaturity as completed
  const activities = yield Activity.findAll({
    attributes: ['id'],
    include: [
      {
        model: SubCompetencyLevel,
        as: 'subCompetencyLevel',
        attributes: [],
        where: {
          subCompetencyId,
          level: { [Op.lte]: level }
        }
      }
    ],
    transaction
  });

  // MSSQL does not support bulkCreate with updateOnDuplicate,
  // so we need to delete first to prevent constraint duplication errors
  yield CompletedActivity.destroy({
    where: {
      employeeEID,
      activityId: { [Op.in]: _.map(activities, 'id') }
    },
    transaction
  });
  yield CompletedActivity.bulkCreate(
    _.map(activities, activity => ({
      employeeEID,
      activityId: activity.id,
      completed: true,
      createdBy: currentUserEID,
      updatedBy: currentUserEID
    })),
    {
      transaction
    }
  );

  // Mark all activities from all levels after currentMaturity till expectedMaturity as incomplete
  const csvSubCompetencyExpectedLevel = yield helper.ensureExist(SubCompetencyLevel, {
    where: { subCompetencyId, level: expectedMaturity },
    transaction
  });
  const activitiesExpectedMaturity = yield Activity.findAll({
    attributes: ['id'],
    include: [
      {
        model: SubCompetencyLevel,
        as: 'subCompetencyLevel',
        attributes: [],
        where: {
          subCompetencyId,
          [Op.and]: [
            {
              level: {
                [Op.gt]: level
              }
            },
            {
              level: {
                [Op.lte]: csvSubCompetencyExpectedLevel.level
              }
            }
          ]
        }
      }
    ],
    transaction
  });

  yield CompletedActivity.destroy({
    where: {
      employeeEID,
      activityId: { [Op.in]: _.map(activitiesExpectedMaturity, 'id') }
    },
    transaction
  });
  yield CompletedActivity.bulkCreate(
    _.map(activitiesExpectedMaturity, activity => ({
      employeeEID,
      activityId: activity.id,
      completed: false,
      createdBy: currentUserEID,
      updatedBy: currentUserEID
    })),
    {
      transaction
    }
  );
}

/**
 * Create a new connection between employee and sub competency.
 * @param {String} employeeEID the employee EID
 * @param {Object} payload the payload
 * @returns {Object} the created connection
 */
function* create(employeeEID, payload) {
  // Validate
  yield validateConnection(employeeEID, payload.competencyId, payload.subCompetencyId, payload);
  yield helper.ensureNotExist(EmployeeSubCompetency, {
    where:
    {
      employeeEID, competencyId: payload.competencyId, subCompetencyId: payload.subCompetencyId
    }
  });

  // Create
  payload.employeeEID = employeeEID;
  payload.createdBy = payload.updatedBy;
  // Doing everything in automanaged transaction to rollback if anything goes wrong
  return yield sequelize.transaction(transaction => co(function* () {
    if (payload.currentMaturity && payload.expectedMaturity) {
      completeActivities(employeeEID, payload.updatedBy, payload.subCompetencyId, payload.currentMaturity, payload.expectedMaturity, transaction);
    }
    // Create
    return yield EmployeeSubCompetency.create(payload);
  }));
}

create.schema = {
  employeeEID: Joi.EID(),
  payload: Joi.object().keys({
    competencyId: Joi.id().required(),
    subCompetencyId: Joi.id().required(),
    currentMaturity: Joi.id().optional(),
    expectedMaturity: Joi.id().optional(),
    updatedBy: Joi.EID()
  })
};

/**
 * Get all employees belonging to particular Competency -> SubCompetency.
 * @param {Number} competencyId the Competency Object ID
 * @param {Number} subCompetencyId the SubCompetency Object ID
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the employee
 */
function* get(competencyId, subCompetencyId, currentUserEID) {
  yield validateConnection(null, competencyId, subCompetencyId, { updatedBy: currentUserEID });
  return yield helper.findAndCountAll(
    EmployeeSubCompetency,
    {
      where:
      {
        competencyId, subCompetencyId, createdBy: currentUserEID
      }
    }
  );
}

get.schema = {
  competencyId: Joi.id(),
  subCompetencyId: Joi.id(),
  currentUserEID: Joi.EID()
};

/**
 * Update a connection between employee and sub competency.
 * @param {String} employeeEID the employee EID
 * @param {Object} payload the payload
 * @returns {Object} the updated connection
 */
function* update(employeeEID, payload) {
  // Validate
  yield validateConnection(employeeEID, payload.competencyId, payload.subCompetencyId, payload);

  const connection = yield helper.ensureExist(
    EmployeeSubCompetency,
    { where: { employeeEID, competencyId: payload.competencyId, subCompetencyId: payload.subCompetencyId } }
  );
  if (connection.createdBy !== payload.updatedBy) {
    throw new ForbiddenError('You are not allowed to access this employee sub competency');
  }
  // If currentMaturity in db is already greater than currentMaturity in csv, then ignore this value
  if (connection.currentMaturity > payload.currentMaturity) payload.currentMaturity = connection.currentMaturity;
  if (payload.currentMaturity) payload.currentMaturity = Number(payload.currentMaturity);

  // If expectedMaturity in db is already greater than expectedMaturity in csv, then ignore this value
  if (connection.expectedMaturity > payload.expectedMaturity) payload.expectedMaturity = connection.expectedMaturity;
  if (payload.expectedMaturity) payload.expectedMaturity = Number(payload.expectedMaturity);

  // Doing everything in automanaged transaction to rollback if anything goes wrong
  return yield sequelize.transaction(transaction => co(function* () {
    completeActivities(employeeEID, payload.updatedBy, payload.subCompetencyId, payload.currentMaturity, payload.expectedMaturity, transaction);
    // Update
    return yield connection.update(payload);
  }));
}

update.schema = create.schema;

/**
 * Delete a connection between employee and sub competency.
 * @param {String} employeeEID the employee EID
 * @param {Number} subCompetencyId the sub competency id
 * @param {String} currentUserEID the current user EID
 */
function* remove(employeeEID, subCompetencyId, currentUserEID) {
  const connection = yield helper.ensureExist(EmployeeSubCompetency, { where: { employeeEID, subCompetencyId } });
  if (connection.createdBy !== currentUserEID) {
    throw new ForbiddenError('You are not allowed to access this employee sub competency');
  }

  yield connection.destroy();
}

remove.schema = {
  employeeEID: Joi.EID(),
  subCompetencyId: Joi.id(),
  currentUserEID: Joi.EID()
};

/**
 * Import connections between employees and sub competencies from CSV file.
 * @param {Array} payload the payload
 * @param {String} currentUserEID the current user EID
 * @returns {Array} the created/updated connections
 */
function* importCSV(payload, currentUserEID) {
  _.each(payload, (connection) => {
    connection.updatedBy = currentUserEID;
    connection.createdBy = currentUserEID;
  });

  // Do everything in a transaction
  return yield sequelize.transaction(transaction => Promise.all(_.map(payload, connection => co(function* () {
    // Validate
    yield validateConnection(connection.employeeEID, connection.competencyId, connection.subCompetencyId, connection, transaction);

    const dbConnection = yield EmployeeSubCompetency.findOne({
      where: { employeeEID: connection.employeeEID, competencyId: connection.competencyId, subCompetencyId: connection.subCompetencyId },
      transaction
    });
    const csvSubCompetencyLevel = yield helper.ensureExist(SubCompetencyLevel, {
      where: { subCompetencyId: connection.subCompetencyId, level: connection.currentMaturity },
      transaction
    });

    // Update if necessary
    if (dbConnection) {
      if (dbConnection.createdBy !== currentUserEID) {
        throw new ForbiddenError(`You are not allowed to access the employee competency of employeeEID=${connection.employeeEID}, competencyId=${connection.competencyId}`);
      }

      // Same level
      if (dbConnection.currentMaturity === connection.currentMaturity) {
        // Just update it
        return yield dbConnection.update(connection, { transaction });
      }

      const dbSubCompetencyLevel = yield helper.ensureExist(SubCompetencyLevel, {
        where: { id: dbConnection.currentMaturity },
        transaction
      });

      // CSV has lower level than DB, do nothing
      if (dbSubCompetencyLevel.level > csvSubCompetencyLevel.level) {
        return dbConnection;
      }
    }

    // Not existed in DB, or CSV has higher level than DB:
    yield completeActivities(connection.employeeEID, currentUserEID, csvSubCompetencyLevel.subCompetencyId, csvSubCompetencyLevel.level, connection.expectedMaturity, transaction);

    // Update
    if (dbConnection) {
      return yield dbConnection.update(connection, { transaction });
    }

    // Create
    return yield EmployeeSubCompetency.create(connection, { transaction });
  }))));
}

importCSV.schema = {
  payload: Joi.array().items(Joi.object().keys({
    competencyId: Joi.id().required(),
    subCompetencyId: Joi.id().required(),
    currentMaturity: Joi.id().required(),
    expectedMaturity: Joi.id().required(),
    employeeEID: Joi.EID()
  })).min(1).required()
    .options({ stripUnknown: true }),
  currentUserEID: Joi.EID()
};


module.exports = {
  create,
  get,
  update,
  remove,
  importCSV
};

logger.buildService(module.exports);
