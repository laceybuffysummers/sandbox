/**
 * This service provides operations to manage SubCompetency.
 */
const Joi = require('joi');
const { Op } = require('sequelize');
const _ = require('lodash');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const { ForbiddenError } = require('../../../common/errors');
const { UserRoles } = require('../../../constants');
const { Competency, SubCompetency } = require('../models');

/**
 * Validate entity ids.
 * @param {Array} ids the entity ids
 * @param {String} currentUserEID the current user EID
 * @param {String} currentUserRole the current user role
 * @private
 */
function* validateIds(ids, currentUserEID, currentUserRole) {
  const where = { id: ids.compId };

  // Validate that Competency exists
  const competency = yield helper.ensureExist(
    Competency,
    { where },
    `Competency does not exist with id=${ids.compId}`,
    true
  );

  if (!currentUserRole || currentUserRole === UserRoles.leader) {
    if (competency.createdBy !== currentUserEID) {
      throw new ForbiddenError('You are not allowed to access this competency');
    }
  }
}

/**
 * Create a new sub competency.
 * @param {Object} ids the ids of parent entities
 * @param {Object} payload the payload
 * @returns {Object} the created sub competency
 */
function* create(ids, payload) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, payload.updatedBy);

  payload.createdBy = payload.updatedBy;
  payload.competencyId = ids.compId;
  return yield SubCompetency.create(payload);
}

create.schema = {
  ids: Joi.object().keys({
    compId: Joi.id()
  }),
  payload: Joi.object().keys({
    name: Joi.string().max(245).required(),
    description: Joi.string().max(2048).required(),
    updatedBy: Joi.EID()
  })
};

/**
 * Search sub competencies.
 * @param {Object} ids the ids of parent entities
 * @param {Object} criteria the search criteria
 * @param {Object} currentUser the current user
 * @returns {Object} the search result
 */
function* search(ids, criteria, currentUser) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, currentUser.EID, currentUser.role);

  const filter = {};

  if (criteria.query) {
    filter.where = {
      [Op.or]: {
        name: { [Op.like]: `%${criteria.query}%` },
        description: { [Op.like]: `%${criteria.query}%` }
      }
    };
  }
  filter.where = _.merge(filter.where, { competencyId: ids.compId });

  if (currentUser.role === UserRoles.leader) {
    // Leader can see only his sub competencies
    filter.where = _.merge(filter.where, { createdBy: currentUser.EID });
  }

  return yield helper.findAndCountAll(SubCompetency, filter, criteria.page, criteria.pageSize);
}

search.schema = {
  ids: create.schema.ids,
  criteria: Joi.object().keys({
    page: Joi.page(),
    pageSize: Joi.pageSize(),
    query: Joi.string()
  }),
  currentUser: Joi.object().required()
};

/**
 * Get a sub competency by id.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the sub competency
 */
function* get(ids, currentUserEID) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, currentUserEID);

  return yield helper.ensureExist(
    SubCompetency,
    { where: { id: ids.subCompId, competencyId: ids.compId, createdBy: currentUserEID } }
  );
}

get.schema = {
  ids: Joi.object().keys({
    compId: Joi.id(),
    subCompId: Joi.id()
  }),
  currentUserEID: Joi.EID()
};

/**
 * Update a sub competency.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {Object} payload the payload
 * @returns {Object} the updated sub competency level
 */
function* update(ids, payload) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, payload.updatedBy);

  return yield helper.findOneAndUpdate(
    SubCompetency,
    { where: { id: ids.subCompId, competencyId: ids.compId, createdBy: payload.updatedBy } },
    payload
  );
}

update.schema = {
  ids: get.schema.ids,
  payload: create.schema.payload
};

/**
 * Delete a sub competency by id.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the removed sub competency
 */
function* remove(ids, currentUserEID) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, currentUserEID);

  return yield helper.findOneAndRemove(
    SubCompetency,
    { where: { id: ids.subCompId, competencyId: ids.compId, createdBy: currentUserEID } }
  );
}

remove.schema = {
  ids: get.schema.ids,
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
