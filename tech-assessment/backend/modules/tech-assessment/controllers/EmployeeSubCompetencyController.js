/**
 * Controller for employee sub-competencies endpoints.
 */
const parse = require('csv-parse/lib/sync');
const { BadRequestError } = require('../../../common/errors');
const service = require('../services/EmployeeSubCompetencyService');

/**
 * Create a new connection between employee and sub competency.
 * @param req the request
 * @param res the response
 */
function* create(req, res) {
  req.body.updatedBy = req.user.EID;
  const result = yield service.create(req.params.EID, req.body);
  res.status(201).send(result);
}

/**
 * Get all the employees having connection to Competency -> SubCompetency.
 * @param req the request
 * @param res the response
 */
function* get(req, res) {
  res.send(yield service.get(req.params.compId, req.params.subCompId, req.user.EID));
}

/**
 * Update a connection between employee and sub competency.
 * @param req the request
 * @param res the response
 */
function* update(req, res) {
  req.body.updatedBy = req.user.EID;
  req.body.subCompetencyId = req.params.subCompId;
  const result = yield service.update(req.params.EID, req.body);
  res.send(result);
}

/**
 * Delete a connection between employee and sub competency.
 * @param req the request
 * @param res the response
 */
function* remove(req, res) {
  yield service.remove(req.params.EID, req.params.subCompId, req.user.EID);
  res.end();
}

/**
 * Import connections between employees and sub competencies from CSV file.
 * @param req the request
 * @param res the response
 */
function* importCSV(req, res) {
  if (!req.file || !req.file.buffer) {
    throw new BadRequestError('CSV file is required');
  }

  // Parse CSV
  const csv = req.file.buffer.toString();
  // Header should be in the first line
  // All characters after # as a comment
  const entities = parse(csv, { columns: true, comment: '#' });

  // Save
  const result = yield service.importCSV(entities, req.user.EID);
  res.send(result);
}


module.exports = {
  create,
  get,
  update,
  remove,
  importCSV
};
