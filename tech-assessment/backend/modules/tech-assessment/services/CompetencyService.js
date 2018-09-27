/**
 * This service provides operations to manage Competency.
 */
const Joi = require('joi');
const { Op } = require('sequelize');
const _ = require('lodash');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const { UserRoles } = require('../../../constants');
const { Competency } = require('../models');
const { ForbiddenError } = require('../../../common/errors');

/**
 * Create a new competency.
 * @param {Object} payload the payload
 * @returns {Object} the created competency
 */
function* create(payload) {
  payload.createdBy = payload.updatedBy;
  return yield Competency.create(payload);
}

create.schema = {
  payload: Joi.object().keys({
    name: Joi.string().max(245).required(),
    description: Joi.string().max(2048).required(),
    updatedBy: Joi.EID()
  })
};

/**
 * Search competencies.
 * @param {Object} criteria the search criteria
 * @param {Object} currentUser the current user
 * @returns {Object} the search result
 */
function* search(criteria, currentUser) {
  const filter = {};

  if (criteria.query) {
    filter.where = {
      [Op.or]: {
        name: { [Op.like]: `%${criteria.query}%` },
        description: { [Op.like]: `%${criteria.query}%` }
      }
    };
  }

  if (currentUser.role === UserRoles.leader) {
    // Leader can access only his competencies
    filter.where = _.merge(filter.where, { createdBy: currentUser.EID });
  }

  return yield helper.findAndCountAll(Competency, filter, criteria.page, criteria.pageSize);
}

search.schema = {
  criteria: Joi.object().keys({
    page: Joi.page(),
    pageSize: Joi.pageSize(),
    query: Joi.string()
  }),
  currentUser: Joi.object().required()
};

/**
 * Get a competency by id.
 * @param {String} id the id
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the competency
 */
function* get(id, currentUserEID) {
  const competency = yield helper.ensureExist(Competency, id);

  // Throw 403 if the current user is not the user who created the competency
  if (currentUserEID !== competency.createdBy) {
    throw new ForbiddenError('You are not allowed to access this competency');
  }

  return competency;
}

get.schema = {
  id: Joi.id(),
  currentUserEID: Joi.EID()
};

/**
 * Update a competency.
 * @param {String} id the id
 * @param {Object} payload the payload
 * @returns {Object} the updated competency
 */
function* update(id, payload) {
  return yield helper.findOneAndUpdate(Competency, { where: { id, createdBy: payload.updatedBy } }, payload);
}

update.schema = {
  id: Joi.id(),
  payload: create.schema.payload
};

/**
 * Delete a competency by id.
 * @param {String} id the id
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the removed competency
 */
function* remove(id, currentUserEID) {
  return yield helper.findOneAndRemove(Competency, { where: { id, createdBy: currentUserEID } });
}

remove.schema = {
  id: Joi.id(),
  currentUserEID: Joi.EID()
};


module.exports = {
  create,
  search,
  get,
  update,
  remove
};

logger.buildService(module.exports);
