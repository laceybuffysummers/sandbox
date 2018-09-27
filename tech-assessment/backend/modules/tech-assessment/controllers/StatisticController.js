/**
 * Controller for statistics endpoint.
 */
const service = require('../services/StatisticService');

/**
 * Get statistics for current user.
 * @param req the request
 * @param res the response
 */
function* search(req, res) {
  res.send(yield service.search(req.query, req.user));
}


module.exports = {
  search
};
