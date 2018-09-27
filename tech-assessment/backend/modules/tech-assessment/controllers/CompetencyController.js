/**
 * Controller for competencies endpoints.
 */
const service = require('../services/CompetencyService');
const logService = require('../services/LogService');

/**
 * Create a new competency.
 * @param req the request
 * @param res the response
 */
function* create(req, res) {
  req.body.updatedBy = req.user.EID;
  const result = yield service.create(req.body);
  res.status(201).send(result);

  // Log to DB
  yield logService.create({
    objectId: result.id,
    objectName: result.name,
    objectType: 'Competency',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'CREATE'
  });
}

/**
 * Search competencies.
 * @param req the request
 * @param res the response
 */
function* search(req, res) {
  res.send(yield service.search(req.query, req.user));
}

/**
 * Get a competency by id.
 * @param req the request
 * @param res the response
 */
function* get(req, res) {
  res.send(yield service.get(req.params.id, req.user.EID));
}

/**
 * Update a competency.
 * @param req the request
 * @param res the response
 */
function* update(req, res) {
  req.body.updatedBy = req.user.EID;
  const result = yield service.update(req.params.id, req.body);
  res.send(result);

  // Log to DB
  yield logService.create({
    objectId: result.id,
    objectName: result.name,
    objectType: 'Competency',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'UPDATE'
  });
}

/**
 * Delete a competency.
 * @param req the request
 * @param res the response
 */
function* remove(req, res) {
  const result = yield service.remove(req.params.id, req.user.EID);
  res.end();

  // Log to DB
  yield logService.create({
    objectId: result.id,
    objectName: result.name,
    objectType: 'Competency',
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
