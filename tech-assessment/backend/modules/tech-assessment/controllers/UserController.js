/**
 * Controller for users endpoints.
 */
const service = require('../services/UserService');
const logService = require('../services/LogService');

/**
 * Create a new user.
 * @param req the request
 * @param res the response
 */
function* create(req, res) {
  req.body.updatedBy = req.user.EID;
  const result = yield service.create(req.body);
  res.status(201).send(result);

  // Log to DB
  yield logService.create({
    objectId: result.EID,
    objectName: result.name,
    objectType: 'User',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'CREATE'
  });
}

/**
 * Search users.
 * @param req the request
 * @param res the response
 */
function* search(req, res) {
  res.send(yield service.search(req.query));
}

/**
 * Get a user by EID.
 * @param req the request
 * @param res the response
 */
function* get(req, res) {
  res.send(yield service.get(req.params.EID));
}

/**
 * Update a user.
 * @param req the request
 * @param res the response
 */
function* update(req, res) {
  req.body.updatedBy = req.user.EID;
  const result = yield service.update(req.params.EID, req.body);
  res.send(result);

  // Log to DB
  yield logService.create({
    objectId: result.EID,
    objectName: result.name,
    objectType: 'User',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'UPDATE'
  });
}

/**
 * Delete a user.
 * @param req the request
 * @param res the response
 */
function* remove(req, res) {
  req.query.deletedBy = req.user.EID;
  const result = yield service.remove(req.params.EID, req.query);
  res.end();

  // Log to DB
  yield logService.create({
    objectId: result.EID,
    objectName: result.name,
    objectType: 'User',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'DELETE'
  });
}


module.exports = {
  create,
  search,
  get,
  update,
  remove
};
