/**
 * This service provides operation to get statistic data.
 */
const Joi = require('joi');
const { Op } = require('sequelize');
const co = require('co');
const _ = require('lodash');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const { BadRequestError, ForbiddenError } = require('../../../common/errors');
const {
  Competency, SubCompetency, User, Employee, EmployeeSubCompetency, SubCompetencyLevel
} = require('../models');
const { UserRoles } = require('../../../constants');

/**
 * Get statistics for current user.
 * @param {Object} criteria the search criteria
 * @param {Object} currentUser the current user
 */
function* search(criteria, currentUser) {
  const competency = yield helper.ensureExist(Competency, criteria.competencyId);
  const subCompetency = yield helper.ensureExist(SubCompetency, criteria.subCompetencyId);

  // Sub competency must belong to the competency
  if (competency.id !== subCompetency.competencyId) {
    throw new BadRequestError('The specified sub competency does not belong to the competency');
  }

  // Leader can access only to his own competency and sub competency
  if (currentUser.role === UserRoles.leader) {
    if (competency.createdBy !== currentUser.EID) {
      throw new ForbiddenError('You are not allowed to access this competency');
    }
    if (subCompetency.createdBy !== currentUser.EID) {
      throw new ForbiddenError('You are not allowed to access this sub competency');
    }
  }

  // Fetch all the levels belonging to Competency -> Sub Competency group
  const levels = yield helper.findAndCountAll(SubCompetencyLevel, {
    where: {
      subCompetencyId: subCompetency.id
    }
  });

  const result = {
    data: _.map(_.values(levels.items), maturityLevel => ({
      id: maturityLevel.id,
      maturityLevel: maturityLevel.name,
      currentCount: 0,
      expectedCount: 0
    }))
  };
  // Get the employees who need to be counted into the statistics
  const whereForEmployees = _.omit(criteria, ['competencyId', 'subCompetencyId']);
  if (currentUser.role === UserRoles.manager) {
    // Manager can see data of the employees he managed
    whereForEmployees.managerEID = currentUser.EID;
  } else if (currentUser.role === UserRoles.director) {
    // Director can see data of the employees managed by his managers
    const managers = yield User.findAll({ where: { directorEID: currentUser.EID, role: UserRoles.manager } });
    const managerEIDs = _.map(managers, 'EID');

    if (managerEIDs.length === 0) {
      // No manager found, just return empty result
      return result;
    }

    whereForEmployees.managerEID = { [Op.in]: managerEIDs };
  }
  const employees = yield Employee.findAll({ where: whereForEmployees });
  const employeeEIDs = _.map(employees, 'EID');

  if (employeeEIDs.length === 0) {
    // No employee found, just return empty result
    return result;
  }

  // Get statistics
  result.data = yield Promise.all(_.map(result.data, statistic => co(function* () {
    return {
      maturityLevel: statistic.maturityLevel,
      currentCount: yield EmployeeSubCompetency.count({
        where: {
          employeeEID: { [Op.in]: employeeEIDs },
          currentMaturity: statistic.id,
          subCompetencyId: criteria.subCompetencyId
        }
      }),
      expectedCount: yield EmployeeSubCompetency.count({
        where: {
          employeeEID: { [Op.in]: employeeEIDs },
          expectedMaturity: statistic.id,
          subCompetencyId: criteria.subCompetencyId
        }
      })
    };
  })));

  return result;
}

search.schema = {
  criteria: Joi.object().keys({
    competencyId: Joi.id(),
    subCompetencyId: Joi.id(),
    country: Joi.string().max(245),
    division: Joi.string().max(245),
    subGroup: Joi.string().max(245),
    profile: Joi.string().max(245)
  }),
  currentUser: Joi.object().required()
};


module.exports = {
  search
};

logger.buildService(module.exports);
