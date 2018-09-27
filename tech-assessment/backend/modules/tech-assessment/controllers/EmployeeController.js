/**
 * Controller for employees endpoints.
 */
const service = require('../services/EmployeeService');
const logService = require('../services/LogService');

/**
 * Create a new employee.
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
    objectType: 'Employee',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'CREATE'
  });
}

/**
 * Search employees.
 * @param req the request
 * @param res the response
 */
function* search(req, res) {
  res.send(yield service.search(req.query));
}

/**
 * Get an employee by id.
 * @param req the request
 * @param res the response
 */
function* get(req, res) {
  res.send(yield service.get(req.params.EID));
}

/**
 * Update an employee.
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
    objectType: 'Employee',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'UPDATE'
  });
}

/**
 * Delete an employee.
 * @param req the request
 * @param res the response
 */
function* remove(req, res) {
  const result = yield service.remove(req.params.EID);
  res.end();

  // Log to DB
  yield logService.create({
    objectId: result.EID,
    objectName: result.name,
    objectType: 'Employee',
    userEID: req.user.EID,
    userName: req.user.name,
    operation: 'DELETE'
  });
}

/**
 * Get all distinct countries.
 * @param req the request
 * @param res the response
 */
function* getCountries(req, res) {
  res.send(yield service.getCountries());
}

/**
 * Get all distinct divisions.
 * @param req the request
 * @param res the response
 */
function* getDivisions(req, res) {
  res.send(yield service.getDivisions());
}

/**
 * Get all distinct sub groups.
 * @param req the request
 * @param res the response
 */
function* getSubGroups(req, res) {
  res.send(yield service.getSubGroups());
}

/**
 * Get all distinct profiles.
 * @param req the request
 * @param res the response
 */
function* getProfiles(req, res) {
  res.send(yield service.getProfiles());
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
