/**
 * Contains all routes.
 */
const _ = require('lodash');
const constants = require('../../constants');

const jwtAuth = constants.Passports.jwt;
const leaderRole = constants.UserRoles.leader;
const allRoles = _.values(constants.UserRoles);

module.exports = {
  '/login': { post: { controller: 'AuthController', method: 'login' } },
  '/users': {
    post: {
      controller: 'UserController', method: 'create', auth: jwtAuth, access: [leaderRole]
    },
    get: {
      controller: 'UserController', method: 'search', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/users/:EID': {
    get: {
      controller: 'UserController', method: 'get', auth: jwtAuth, access: [leaderRole]
    },
    put: {
      controller: 'UserController', method: 'update', auth: jwtAuth, access: [leaderRole]
    },
    delete: {
      controller: 'UserController', method: 'remove', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/competencies/:compId/sub-competencies/:subCompId/levels/:levelId/activities': {
    post: {
      controller: 'ActivityController', method: 'create', auth: jwtAuth, access: [leaderRole]
    },
    get: {
      controller: 'ActivityController', method: 'search', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/competencies/:compId/sub-competencies/:subCompId/levels/:levelId/activities/:activityId': {
    get: {
      controller: 'ActivityController', method: 'get', auth: jwtAuth, access: [leaderRole]
    },
    put: {
      controller: 'ActivityController', method: 'update', auth: jwtAuth, access: [leaderRole]
    },
    delete: {
      controller: 'ActivityController', method: 'remove', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/competencies/:compId/sub-competencies/:subCompId/levels': {
    post: {
      controller: 'SubCompetencyLevelController', method: 'create', auth: jwtAuth, access: [leaderRole]
    },
    get: {
      controller: 'SubCompetencyLevelController', method: 'search', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/competencies/:compId/sub-competencies/:subCompId/levels/:levelId': {
    get: {
      controller: 'SubCompetencyLevelController', method: 'get', auth: jwtAuth, access: [leaderRole]
    },
    put: {
      controller: 'SubCompetencyLevelController', method: 'update', auth: jwtAuth, access: [leaderRole]
    },
    delete: {
      controller: 'SubCompetencyLevelController', method: 'remove', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/competencies/:compId/sub-competencies/:subCompId/employees': {
    get: {
      controller: 'EmployeeSubCompetencyController', method: 'get', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/competencies/:compId/sub-competencies': {
    post: {
      controller: 'SubCompetencyController', method: 'create', auth: jwtAuth, access: [leaderRole]
    },
    get: {
      controller: 'SubCompetencyController', method: 'search', auth: jwtAuth, access: allRoles
    }
  },
  '/competencies/:compId/sub-competencies/:subCompId': {
    get: {
      controller: 'SubCompetencyController', method: 'get', auth: jwtAuth, access: [leaderRole]
    },
    put: {
      controller: 'SubCompetencyController', method: 'update', auth: jwtAuth, access: [leaderRole]
    },
    delete: {
      controller: 'SubCompetencyController', method: 'remove', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/competencies': {
    post: {
      controller: 'CompetencyController', method: 'create', auth: jwtAuth, access: [leaderRole]
    },
    get: {
      controller: 'CompetencyController', method: 'search', auth: jwtAuth, access: allRoles
    }
  },
  '/competencies/:id': {
    get: {
      controller: 'CompetencyController', method: 'get', auth: jwtAuth, access: [leaderRole]
    },
    put: {
      controller: 'CompetencyController', method: 'update', auth: jwtAuth, access: [leaderRole]
    },
    delete: {
      controller: 'CompetencyController', method: 'remove', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/employees': {
    post: {
      controller: 'EmployeeController', method: 'create', auth: jwtAuth, access: [leaderRole]
    },
    get: {
      controller: 'EmployeeController', method: 'search', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/employees/:EID': {
    get: {
      controller: 'EmployeeController', method: 'get', auth: jwtAuth, access: [leaderRole]
    },
    put: {
      controller: 'EmployeeController', method: 'update', auth: jwtAuth, access: [leaderRole]
    },
    delete: {
      controller: 'EmployeeController', method: 'remove', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/lookup/employees/countries': {
    get: {
      controller: 'EmployeeController', method: 'getCountries', auth: jwtAuth, access: allRoles
    }
  },
  '/lookup/employees/divisions': {
    get: {
      controller: 'EmployeeController', method: 'getDivisions', auth: jwtAuth, access: allRoles
    }
  },
  '/lookup/employees/subGroups': {
    get: {
      controller: 'EmployeeController', method: 'getSubGroups', auth: jwtAuth, access: allRoles
    }
  },
  '/lookup/employees/profiles': {
    get: {
      controller: 'EmployeeController', method: 'getProfiles', auth: jwtAuth, access: allRoles
    }
  },
  '/logs': {
    get: {
      controller: 'LogController', method: 'search', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/employees/:EID/levels': {
    post: {
      controller: 'CompletedActivityController', method: 'markLevelAsCompleted', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/employees/:EID/activities': {
    get: {
      controller: 'CompletedActivityController', method: 'search', auth: jwtAuth, access: [leaderRole]
    },
    post: {
      controller: 'CompletedActivityController', method: 'associateEmployeeToActivity', auth: jwtAuth, access: [leaderRole]
    },
    put: {
      controller: 'CompletedActivityController', method: 'markActivityAsCompleted', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/employees/:EID/activities/:activityId': {
    delete: {
      controller: 'CompletedActivityController', method: 'remove', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/employees/:EID/sub-competencies': {
    post: {
      controller: 'EmployeeSubCompetencyController', method: 'create', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/employees/:EID/sub-competencies/:subCompId': {
    put: {
      controller: 'EmployeeSubCompetencyController', method: 'update', auth: jwtAuth, access: [leaderRole]
    },
    delete: {
      controller: 'EmployeeSubCompetencyController', method: 'remove', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/employee-sub-competencies': {
    post: {
      controller: 'EmployeeSubCompetencyController', method: 'importCSV', auth: jwtAuth, access: [leaderRole]
    }
  },
  '/statistics': {
    get: {
      controller: 'StatisticController', method: 'search', auth: jwtAuth, access: allRoles
    }
  }
};
