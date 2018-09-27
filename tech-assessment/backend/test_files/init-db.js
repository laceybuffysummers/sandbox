/**
 * Initialize database with a leader user.
 */
const co = require('co');
const helper = require('../common/helper');
const logger = require('../common/logger');
const models = require('../modules/tech-assessment/models');
const constants = require('../constants');

/**
 * Initialize database with users.
 */
function* generate() {
  logger.debug('Initializing database');

  yield models.sequelize.sync({ force: true });

  yield models.User.bulkCreate([
    // Director
    {
      EID: 'EID001',
      name: 'User 001',
      role: constants.UserRoles.director,
      status: constants.UserStatus.active,
      username: 'user001',
      password: helper.hashPassword('password'),
      createdBy: 'init-db',
      updatedBy: 'init-db'
    },
    // Manager
    {
      EID: 'EID002',
      name: 'User 002',
      role: constants.UserRoles.manager,
      status: constants.UserStatus.active,
      username: 'user002',
      password: helper.hashPassword('password'),
      directorEID: 'EID001',
      createdBy: 'init-db',
      updatedBy: 'init-db'
    },
    // Leader
    {
      EID: 'EID003',
      name: 'User 003',
      role: constants.UserRoles.leader,
      status: constants.UserStatus.active,
      username: 'user003',
      password: helper.hashPassword('password'),
      directorEID: 'EID001',
      createdBy: 'init-db',
      updatedBy: 'init-db'
    }
  ]);

  logger.debug('Initializing database - Completed');
}

co(generate)
  .then(process.exit)
  .catch(logger.error);
