/**
 * This service provides operations to manage Activity.
 */
const Joi = require('joi');
const { Op } = require('sequelize');
const _ = require('lodash');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const {
  Competency, SubCompetency, SubCompetencyLevel, Activity
} = require('../models');

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

  // Validate that SubCompetencyLevel exists
  yield helper.ensureExist(
    SubCompetencyLevel,
    { where: { id: ids.levelId, subCompetencyId: ids.subCompId, createdBy: currentUserEID } },
    `SubCompetencyLevel does not exist with id=${ids.levelId}`,
    true
  );
}

/**
 * Create a new activity.
 * @param {Object} ids the ids of parent entities
 * @param {Object} payload the payload
 * @returns {Object} the created activity
 */
function* create(ids, payload) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, payload.updatedBy);

  payload.createdBy = payload.updatedBy;
  payload.subCompetencyLevelId = ids.levelId;
  return yield Activity.create(payload);
}

create.schema = {
  ids: Joi.object().keys({
    compId: Joi.id(),
    subCompId: Joi.id(),
    levelId: Joi.id()
  }),
  payload: Joi.object().keys({
    name: Joi.string().max(245).required(),
    skillAcquired: Joi.string().max(245).required(),
    lifeExperience: Joi.string().max(245).required(),
    updatedBy: Joi.EID()
  })
};

/**
 * Search activities.
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
        name: { [Op.like]: `%${criteria.query}%` }
      }
    };
  }
  filter.where = _.merge(filter.where, { subCompetencyLevelId: ids.levelId, createdBy: currentUserEID });

  return yield helper.findAndCountAll(Activity, filter, criteria.page, criteria.pageSize);
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
 * Get an activity by id.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the activity
 */
function* get(ids, currentUserEID) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, currentUserEID);

  return yield helper.ensureExist(
    Activity,
    { where: { id: ids.activityId, subCompetencyLevelId: ids.levelId, createdBy: currentUserEID } }
  );
}

get.schema = {
  ids: Joi.object().keys({
    compId: Joi.id(),
    subCompId: Joi.id(),
    levelId: Joi.id(),
    activityId: Joi.id()
  }),
  currentUserEID: Joi.EID()
};

/**
 * Update a activity.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {Object} payload the payload
 * @returns {Object} the updated activity
 */
function* update(ids, payload) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, payload.updatedBy);

  return yield helper.findOneAndUpdate(
    Activity,
    { where: { id: ids.activityId, subCompetencyLevelId: ids.levelId, createdBy: payload.updatedBy } },
    payload
  );
}

update.schema = {
  ids: get.schema.ids,
  payload: create.schema.payload
};

/**
 * Delete a activity by id.
 * @param {String} ids the ids of the parent entities and this entity
 * @param {String} currentUserEID the current user EID
 * @returns {Object} the removed activity
 */
function* remove(ids, currentUserEID) {
  // Validate ids to be existed and accessible
  yield validateIds(ids, currentUserEID);

  return yield helper.findOneAndRemove(
    Activity,
    { where: { id: ids.activityId, subCompetencyLevelId: ids.levelId, createdBy: currentUserEID } }
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
