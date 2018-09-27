/**
 * This service provides operations to manage SubCompetencyLevel.
 */
const Joi = require('joi');
const { Op } = require('sequelize');
const _ = require('lodash');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const { Competency, SubCompetency, SubCompetencyLevel } = require('../models');

/**
 * Validate entity ids.
 * @param {Array} ids the entity ids
 * @param {String} currentUserEID the current user EID
 * @private
 */
function* validateIds(ids, currentUserEID) {
  // Validate that Competency exists
  yield helper.ensureExist(
    Competency,
    { where: { id: ids.compId, createdBy: currentUserEID } },
    `Competency does not exist with id=${ids.compId}`,
    true
  );

  // Validate that SubCompetency exists
  yield helper.ensureExist(
    SubCompetency,
    { where: { id: ids.subCompId, competencyId: ids.compId, createdBy: currentUserEID } },
    `SubCompetency does not exist with id=${ids.subCompId}`,
    true
  );
}

/**
 * Create a new sub competency level.
 * @param {Object} ids the ids of parent entities
 * @param {Object} payload the payload
 * @returns {Object} the created sub competency level
 */
function* create(ids, payload) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, payload.updatedBy);
  yield helper.ensureNotExist(
    SubCompetencyLevel,
    { where: { level: payload.level, subCompetencyId: ids.subCompId, createdBy: payload.updatedBy } },
    `Level already exists with id=${payload.level}`
  );
  payload.createdBy = payload.updatedBy;
  payload.subCompetencyId = ids.subCompId;
  return yield SubCompetencyLevel.create(payload);
}

create.schema = {
  ids: Joi.object().keys({
    compId: Joi.id(),
    subCompId: Joi.id()
  }),
  payload: Joi.object().keys({
    level: Joi.number().integer().required(),
    name: Joi.string().max(245).required(),
    description: Joi.string().max(2048).required(),
    updatedBy: Joi.EID()
  })
};

/**
 * Search sub competency levels.
 * @param {Object} ids the ids of parent entities
 * @param {Object} criteria the search criteria
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the search result
 */
function* search(ids, criteria, currentUserEID) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, currentUserEID);

  const filter = {};

  if (criteria.query) {
    filter.where = {
      [Op.or]: {
        name: { [Op.like]: `%${criteria.query}%` },
        description: { [Op.like]: `%${criteria.query}%` }
      }
    };
  }
  filter.where = _.merge(filter.where, { subCompetencyId: ids.subCompId, createdBy: currentUserEID });

  return yield helper.findAndCountAll(SubCompetencyLevel, filter, criteria.page, criteria.pageSize);
}

search.schema = {
  ids: create.schema.ids,
  criteria: Joi.object().keys({
    page: Joi.page(),
    pageSize: Joi.pageSize(),
    query: Joi.string()
  }),
  currentUserEID: Joi.EID()
};

/**
 * Get a sub competency level by id.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the sub competency level
 */
function* get(ids, currentUserEID) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, currentUserEID);

  return yield helper.ensureExist(
    SubCompetencyLevel,
    { where: { level: ids.levelId, subCompetencyId: ids.subCompId, createdBy: currentUserEID } }
  );
}

get.schema = {
  ids: Joi.object().keys({
    compId: Joi.id(),
    subCompId: Joi.id(),
    levelId: Joi.id()
  }),
  currentUserEID: Joi.EID()
};

/**
 * Update a sub competency level.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {Object} payload the payload
 * @returns {Object} the updated sub competency level
 */
function* update(ids, payload) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, payload.updatedBy);
  // if (payload.level) delete payload.level;
  return yield helper.findOneAndUpdate(
    SubCompetencyLevel,
    { where: { id: ids.levelId, subCompetencyId: ids.subCompId, createdBy: payload.updatedBy } },
    payload
  );
}

update.schema = {
  ids: get.schema.ids,
  payload: Joi.object().keys({
    name: Joi.string().max(245).required(),
    description: Joi.string().max(2048).required(),
    updatedBy: Joi.EID()
  })
};

/**
 * Delete a sub competency level by id.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the removed sub competency level
 */
function* remove(ids, currentUserEID) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, currentUserEID);

  return yield helper.findOneAndRemove(
    SubCompetencyLevel,
    { where: { id: ids.levelId, subCompetencyId: ids.subCompId, createdBy: currentUserEID } }
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
