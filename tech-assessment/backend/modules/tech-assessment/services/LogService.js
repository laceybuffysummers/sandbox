/**
 * This service will provide log operation.
 */
const Joi = require('joi');
const { Op } = require('sequelize');
const logger = require('../../../common/logger');
const helper = require('../../../common/helper');
const { Log } = require('../models');

/**
* Create a log.
* @param {Object} payload the payload
*/
function* create(payload) {
  yield Log.create(payload);
}

create.schema = {
  payload: Joi.object().keys({
    objectId: Joi.alternatives().try(Joi.EID(), Joi.id()).required(),
    objectName: Joi.string().max(245).required(),
    objectType: Joi.string().max(45).required(),
    userEID: Joi.EID(),
    userName: Joi.string().max(245).required(),
    operation: Joi.string().max(6).required()
  })
};

/**
 * Search logs.
 * @param {Object} criteria the search criteria
 * @returns {Object} the search result
 */
function* search(criteria) {
  const filter = {
    attributes: { exclude: ['id'] },
    order: [['dateTime', 'desc']]
  };

  if (criteria.query) {
    filter.where = {
      [Op.or]: {
        objectId: { [Op.like]: `%${criteria.query}%` },
        objectName: { [Op.like]: `%${criteria.query}%` }
      }
    };
  }

  return yield helper.findAndCountAll(Log, filter, criteria.page, criteria.pageSize);
}

search.schema = {
  criteria: Joi.object().keys({
    page: Joi.page(),
    pageSize: Joi.pageSize(),
    query: Joi.string().max(245) // Set max length to prevent 500 error
  })
};

module.exports = {
  create,
  search
};

logger.buildService(module.exports);
