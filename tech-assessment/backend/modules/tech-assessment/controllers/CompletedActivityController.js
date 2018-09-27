/**
 * Controller for employee completed activities endpoints.
 */
const service = require('../services/CompletedActivityService');

/**
 * Mark all activities within a SubCompetencyLevel as completed for the specified employee.
 * @param req the request
 * @param res the response
 */
function* markLevelAsCompleted(req, res) {
  yield service.markLevelAsCompleted(req.params.EID, req.body, req.user.EID);
  res.status(201).end();
}

/**
 * Mark an activity as completed for the specified employee.
 * @param req the request
 * @param res the response
 */
function* markActivityAsCompleted(req, res) {
  yield service.markActivityAsCompleted(req.params.EID, req.body, req.user.EID);
  res.status(201).end();
}

/**
 * Search completed activities.
 * @param req the request
 * @param res the response
 */
function* search(req, res) {
  res.send(yield service.search(req.params.EID, req.query, req.user.EID));
}

/**
 * Associate an employee to activity.
 * @param req the request
 * @param res the response
 */
function* associateEmployeeToActivity(req, res) {
  res.send(yield service.associateEmployeeToActivity(req.params.EID, req.body, req.user.EID));
}

/**
 * Delete a completed activity.
 * @param req the request
 * @param res the response
 */
function* remove(req, res) {
  yield service.remove(req.params.EID, req.params.activityId, req.user.EID);
  res.end();
}


module.exports = {
  markLevelAsCompleted,
  markActivityAsCompleted,
  search,
  associateEmployeeToActivity,
  remove
};
