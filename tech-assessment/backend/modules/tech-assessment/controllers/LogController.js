/**
 * Controller for logs endpoints.
 */
const service = require('../services/LogService');

/**
 * Search logs.
 * @param req the request
 * @param res the response
 */
function* search(req, res) {
  res.send(yield service.search(req.query));
}

module.exports = {
  search
};
