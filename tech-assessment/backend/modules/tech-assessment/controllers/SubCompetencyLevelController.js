/**
 * Controller for levels endpoints.
 */
const service = require('../services/SubCompetencyLevelService');
const logService = require('../services/LogService');

/**
 * Create a new level.
 * @param req the request
 * @param res the response
 */
function* create(req, res) {
  req.body.updatedBy = req.user.EID;
  const result = yield service.create(req.params, req.body);
  res.status(201).send(result);

  // Log to DB
  yield logService.create({
    objectId: result.id,
    objectName: result.name,
    objectType: 'SubCompetencyLevel',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'CREATE'
  });
}

/**
 * Search levels.
 * @param req the request
 * @param res the response
 */
function* search(req, res) {
  res.send(yield service.search(req.params, req.query, req.user.EID));
}

/**
 * Get a level by id.
 * @param req the request
 * @param res the response
 */
function* get(req, res) {
  res.send(yield service.get(req.params, req.user.EID));
}

/**
 * Update a level.
 * @param req the request
 * @param res the response
 */
function* update(req, res) {
  req.body.updatedBy = req.user.EID;
  const result = yield service.update(req.params, req.body);
  res.send(result);

  // Log to DB
  yield logService.create({
    objectId: result.id,
    objectName: result.name,
    objectType: 'SubCompetencyLevel',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'UPDATE'
  });
}

/**
 * Delete a level.
 * @param req the request
 * @param res the response
 */
function* remove(req, res) {
  const result = yield service.remove(req.params, req.user.EID);
  res.end();

  // Log to DB
  yield logService.create({
    objectId: result.id,
    objectName: result.name,
    objectType: 'SubCompetencyLevel',
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
