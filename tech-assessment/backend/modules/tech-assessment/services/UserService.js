/**
 * This service provides operations to manage User.
 */
const Joi = require('joi');
const _ = require('lodash');
const { Op } = require('sequelize');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const constants = require('../../../constants');
const { User } = require('../models');


/**
 * Omit password from the object.
 * @param {Object|Array} obj the object
 * @returns {Object|Array} the updated object without password
 * @private
 */
function omitPassword(obj) {
  if (obj.items) {
    obj.items = _.map(obj.items, omitPassword);
  }

  return _.omit(obj.toJSON ? obj.toJSON() : obj, 'password');
}

/**
 * Create a new user.
 * @param {Object} payload the payload
 * @returns {Object} the created user
 */
function* create(payload) {
  // Validate EID and username to be unique
  yield helper.ensureNotExist(
    User, { where: { EID: payload.EID }, paranoid: false },
    `User already existed with EID=${payload.EID}`
  );
  yield helper.ensureNotExist(
    User,
    { where: { username: payload.username }, paranoid: false },
    `User already existed with username=${payload.username}`
  );

  // Hash password
  payload.password = helper.hashPassword(payload.password);

  payload.createdBy = payload.updatedBy;

  return omitPassword(yield User.create(payload));
}

create.schema = {
  payload: Joi.object().keys({
    EID: Joi.EID(),
    name: Joi.string().max(245).required(),
    role: Joi.string().valid(_.values(constants.UserRoles)).required(),
    username: Joi.string().max(245).required(),
    password: Joi.string().max(45).required(),
    status: Joi.string().valid(_.values(constants.UserStatus)).required(),
    updatedBy: Joi.EID(),
    directorEID: Joi.EID().optional().allow(null)
  })
};

/**
 * Search users.
 * @param {Object} criteria the search criteria
 * @returns {Object} the search result
 */
function* search(criteria) {
  const filter = {};

  if (criteria.query) {
    filter.where = {
      [Op.or]: {
        EID: { [Op.like]: `%${criteria.query}%` },
        name: { [Op.like]: `%${criteria.query}%` }
      }
    };
  }
  filter.paranoid = false;
  filter.order = [['createdAt', 'DESC']];
  return omitPassword(yield helper.findAndCountAll(User, filter, criteria.page, criteria.pageSize));
}

search.schema = {
  criteria: Joi.object().keys({
    page: Joi.page(),
    pageSize: Joi.pageSize(),
    query: Joi.string().max(245)
  })
};

/**
 * Get a user by EID.
 * @param {String} EID the EID
 * @returns {Object} the user
 */
function* get(EID) {
  return omitPassword(yield helper.ensureExist(User, { where: { EID }, paranoid: false }));
}

get.schema = {
  EID: Joi.EID()
};

/**
 * Update a user.
 * @param {String} EID the EID
 * @param {Object} payload the payload
 * @returns {Object} the updated user
 */
function* update(EID, payload) {
  const user = yield helper.ensureExist(User, { where: { EID }, paranoid: false });

  // Validate username to be unique
  if (user.username !== payload.username) {
    yield helper.ensureNotExist(
      User,
      { where: { username: payload.username }, paranoid: false },
      `User already existed with username=${payload.username}`
    );
  }

  // Hash password
  payload.password = helper.hashPassword(payload.password);

  // Undelete
  if (payload.hasOwnProperty('deletedAt')) { // eslint-disable-line no-prototype-builtins
    payload.deletedBy = null;
    user.setDataValue('deletedAt', null);
  }

  return omitPassword(yield user.update(payload));
}

update.schema = {
  EID: Joi.EID(),
  payload: Joi.object().keys({
    name: Joi.string().max(245).required(),
    role: Joi.string().valid(_.values(constants.UserRoles)).required(),
    username: Joi.string().max(245).required(),
    password: Joi.string().max(45).optional(),
    status: Joi.string().valid(_.values(constants.UserStatus)).required(),
    updatedBy: Joi.EID(),
    directorEID: Joi.EID().optional().allow(null),
    deletedAt: Joi.valid(null).optional() // Set null to undelete
  })
};

/**
 * Delete a user by EID.
 * @param {String} EID the EID to delete
 * @param {String} payload the payload
 * @returns {Object} the removed user
 */
function* remove(EID, payload) {
  const user = yield helper.ensureExist(User, { where: { EID }, paranoid: !payload.hardDelete });

  yield user.update({ deletedBy: payload.deletedBy });
  yield user.destroy({ force: payload.hardDelete });

  return omitPassword(user);
}

remove.schema = {
  EID: Joi.EID(),
  payload: Joi.object().keys({
    hardDelete: Joi.boolean().default(false),
    deletedBy: Joi.EID()
  })
};


module.exports = {
  create,
  search,
  get,
  update,
  remove
};

logger.buildService(module.exports);
