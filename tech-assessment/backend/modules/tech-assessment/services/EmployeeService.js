/**
 * This service provides operations to manage Employee.
 */
const Joi = require('joi');
const { Op } = require('sequelize');
const helper = require('../../../common/helper');
const logger = require('../../../common/logger');
const { Employee, sequelize } = require('../models');
const Sequelize = require('sequelize');
const _ = require('lodash');

/**
 * Create a new employee.
 * @param {Object} payload the payload
 * @returns {Object} the created employee
 */
function* create(payload) {
  // Validate EID to be unique
  yield helper.ensureNotExist(
    Employee,
    { where: { EID: payload.EID } },
    `Employee already existed with EID=${payload.EID}`
  );

  payload.createdBy = payload.updatedBy;

  return yield Employee.create(payload);
}

create.schema = {
  payload: Joi.object().keys({
    EID: Joi.EID(),
    name: Joi.string().max(245).required(),
    country: Joi.string().max(245).required(),
    division: Joi.string().max(245).required(),
    subGroup: Joi.string().max(245).required(),
    profile: Joi.string().max(2048).required(),
    managerEID: Joi.EID(),
    updatedBy: Joi.EID()
  })
};

/**
 * Search employees.
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
  filter.order = [['createdAt', 'DESC']];
  return yield helper.findAndCountAll(Employee, filter, criteria.page, criteria.pageSize);
}

search.schema = {
  criteria: Joi.object().keys({
    page: Joi.page(),
    pageSize: Joi.pageSize(),
    query: Joi.string().max(245) // Set max length to prevent 500 error
  })
};

/**
 * Get an employee by EID.
 * @param {String} EID the EID
 * @returns {Object} the employee
 */
function* get(EID) {
  return yield helper.ensureExist(Employee, EID);
}

get.schema = {
  EID: Joi.EID()
};

/**
 * Update an employee.
 * @param {String} EID the EID
 * @param {Object} payload the payload
 * @returns {Object} the updated employee
 */
function* update(EID, payload) {
  return yield helper.findOneAndUpdate(Employee, EID, payload);
}

update.schema = {
  EID: Joi.EID(),
  payload: Joi.object().keys({
    name: Joi.string().max(245).required(),
    country: Joi.string().max(245).required(),
    division: Joi.string().max(245).required(),
    subGroup: Joi.string().max(245).required(),
    profile: Joi.string().max(2048).required(),
    managerEID: Joi.EID(),
    updatedBy: Joi.EID()
  })
};

/**
 * Delete an employee by EID.
 * @param {String} EID the EID to delete
 * @returns {Object} the removed employee
 */
function* remove(EID) {
  return yield helper.findOneAndRemove(Employee, EID);
}

remove.schema = {
  EID: Joi.EID()
};

/**
 * Get all distinct fields of employees.
 * @param {String} field the field
 * @returns {Array} all distinct fields employees
 */
function* getDistinctFields(field) {
  const sql = `SELECT DISTINCT ${field} AS result FROM Employees;`;
  const res = yield sequelize.query(sql, { replacements: [], type: Sequelize.QueryTypes.SELECT });
  return _.map(res, item => item.result);
}

/**
 * Get all distinct countries.
 * @returns {Array} all distinct countries
 */
function* getCountries() {
  return yield getDistinctFields('country');
}

/**
 * Get all distinct divisions.
 * @returns {Array} all distinct divisions
 */
function* getDivisions() {
  return yield getDistinctFields('division');
}

/**
 * Get all distinct sub groups.
 * @returns {Array} all distinct sub groups
 */
function* getSubGroups() {
  return yield getDistinctFields('subGroup');
}

/**
 * Get all distinct profiles.
 * @returns {Array} all distinct profiles
 */
function* getProfiles() {
  return yield getDistinctFields('profile');
}

module.exports = {
  create,
  search,
  get,
  update,
  remove,
  getCountries,
  getDivisions,
  getSubGroups,
  getProfiles
};

logger.buildService(module.exports);
