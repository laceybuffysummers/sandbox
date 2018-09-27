/**
 * This service provides operations to manage CompletedActivity.
 */
const Joi = require('joi');
const _ = require('lodash');
const { Op } = require('sequelize');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const { ForbiddenError } = require('../../../common/errors');
const {
  Employee, Activity, SubCompetencyLevel, CompletedActivity
} = require('../models');

/**
 * Update completed activity.
 * @param {String} employeeEID the employee EID
 * @param {Object} activity the activity
 * @param {String} currentUserEID the current user EID
 * @private
 */
function* updateCompletedActivity(employeeEID, activity, currentUserEID) {
  // Check whether Activity entry is present in CompletedActivity table, if not create Activity as incomplete
  // else do nothing
  yield CompletedActivity
    .findOrCreate({
      where: {
        employeeEID,
        activityId: activity.id,
        completed: false
      },
      defaults: {
        createdBy: currentUserEID,
        updatedBy: currentUserEID
      }
    });

  // Update the Activity as completed in CompletedActivity table
  yield CompletedActivity
    .update({
      completed: true
    }, {
      where: {
        employeeEID,
        activityId: activity.id
      }
    });
}

/**
 * Mark all activities within a SubCompetencyLevel as completed for the specified employee.
 * @param {String} employeeEID the employee EID
 * @param {Object} payload the payload
 * @param {String} currentUserEID the current user EID
 */
function* markLevelAsCompleted(employeeEID, payload, currentUserEID) {
  yield helper.ensureExist(Employee, employeeEID);
  const level = yield helper.ensureExist(SubCompetencyLevel, payload.levelId);

  // Throw 403 if the current user is not the user who created the level
  if (currentUserEID !== level.createdBy) {
    throw new ForbiddenError('You are not allowed to access this sub competency level');
  }

  const activities = yield Activity.findAll({ where: { subCompetencyLevelId: payload.levelId }, attributes: ['id'] });

  // Complete all activities for the employee
  yield Promise.all(_.map(activities, activity =>
    updateCompletedActivity(employeeEID, activity, currentUserEID)));
}

markLevelAsCompleted.schema = {
  employeeEID: Joi.EID(),
  payload: Joi.object().keys({
    levelId: Joi.id()
  }),
  currentUserEID: Joi.EID()
};

/**
 * Mark an activity as completed for the specified employee.
 * @param {String} employeeEID the employee EID
 * @param {Object} payload the payload
 * @param {String} currentUserEID the current user EID
 */
function* markActivityAsCompleted(employeeEID, payload, currentUserEID) {
  yield helper.ensureExist(Employee, employeeEID);
  const activity = yield helper.ensureExist(Activity, payload.activityId);

  // Throw 403 if the current user is not the user who created the activity
  if (currentUserEID !== activity.createdBy) {
    throw new ForbiddenError('You are not allowed to access this activity');
  }

  // Throw 409 if already exists
  yield helper.ensureNotExist(CompletedActivity, {
    where: {
      employeeEID,
      activityId: activity.id,
      completed: true
    }
  });

  yield updateCompletedActivity(employeeEID, activity, currentUserEID);
}

markActivityAsCompleted.schema = {
  employeeEID: Joi.EID(),
  payload: Joi.object().keys({
    activityId: Joi.id()
  }),
  currentUserEID: Joi.EID()
};

/**
 * Associate an Employee to an activity.
 * @param {String} employeeEID the employee EID
 * @param {Object} payload the payload
 * @param {String} currentUserEID the current user EID
 */
function* associateEmployeeToActivity(employeeEID, payload, currentUserEID) {
  yield helper.ensureExist(Employee, employeeEID);
  const activity = yield helper.ensureExist(Activity, payload.activityId);

  // Throw 403 if the current user is not the user who created the activity
  if (currentUserEID !== activity.createdBy) {
    throw new ForbiddenError('You are not allowed to access this activity');
  }

  // Throw 409 if already exists
  yield helper.ensureNotExist(CompletedActivity, {
    where: {
      employeeEID,
      activityId: activity.id
    }
  });

  yield CompletedActivity
    .findOrCreate({
      where: {
        employeeEID,
        activityId: activity.id,
        completed: false
      },
      defaults: {
        createdBy: currentUserEID,
        updatedBy: currentUserEID
      }
    });
}

associateEmployeeToActivity.schema = {
  employeeEID: Joi.EID(),
  payload: Joi.object().keys({
    activityId: Joi.id()
  }),
  currentUserEID: Joi.EID()
};


/**
 * Search completed activities of the specified employee.
 * @param {String} employeeEID the employee EID
 * @param {Object} criteria the search criteria
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the search result
 */
function* search(employeeEID, criteria, currentUserEID) {
  // Get completed activities
  const completedActivities = yield CompletedActivity.findAll({
    where: { employeeEID, createdBy: currentUserEID },
    attributes: ['activityId', 'completed']
  });
  const completedActivityIds = _.map(completedActivities, 'activityId');

  // Make sure that the query still works with no completed activity
  completedActivityIds.push(0);

  // Get the activities
  const where = {
    [Op.and]: {
      id: { [Op.in]: completedActivityIds },
      createdBy: currentUserEID,
      [Op.or]: {
        name: { [Op.like]: `%${criteria.query || ''}%` }
      }
    }
  };

  const activities = yield helper.findAndCountAll(Activity, { where }, criteria.page, criteria.pageSize);
  activities.items = yield _.map(activities.items, (activity) => {
    const { completed } = _.find(completedActivities, { activityId: activity.id });
    const newActivity = _.assign({}, activity.dataValues, { completed });
    return newActivity;
  });
  return activities;
}

search.schema = {
  employeeEID: Joi.EID(),
  criteria: Joi.object().keys({
    page: Joi.page(),
    pageSize: Joi.pageSize(),
    query: Joi.string()
  }),
  currentUserEID: Joi.EID()
};

/**
 * Delete a completed activity for a specified employee.
 * @param {String} employeeEID the employee EID
 * @param {Number} activityId the activity id
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the completed activity which has been deleted
 */
function* remove(employeeEID, activityId, currentUserEID) {
  yield helper.ensureExist(Employee, employeeEID);
  const activity = yield helper.ensureExist(Activity, activityId);

  // Throw 403 if the current user is not the user who created the activity
  if (currentUserEID !== activity.createdBy) {
    throw new ForbiddenError('You are not allowed to access this activity');
  }

  const completedActivity = yield helper.findOneAndRemove(CompletedActivity, {
    where: { employeeEID, activityId }
  });

  return {
    id: completedActivity.id,
    employeeEID,
    activityId: activity.id,
    activityName: activity.name
  };
}

remove.schema = {
  employeeEID: Joi.EID(),
  activityId: Joi.id(),
  currentUserEID: Joi.EID()
};


module.exports = {
  markLevelAsCompleted,
  markActivityAsCompleted,
  associateEmployeeToActivity,
  search,
  remove
};

logger.buildService(module.exports);
