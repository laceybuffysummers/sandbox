/**
 * App bootstrap.
 */
const Joi = require('joi');

Joi.id = () => Joi.number().integer().positive().required();
Joi.EID = () => Joi.string().max(45).required();
Joi.page = () => Joi.number().integer().min(0).default(0);
Joi.pageSize = () => Joi.number().integer().min(1).default(20);
