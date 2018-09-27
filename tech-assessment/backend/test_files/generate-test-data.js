/**
 * Generate test data.
 */
const co = require('co');
const helper = require('../common/helper');
const logger = require('../common/logger');
const models = require('../modules/tech-assessment/models');
const constants = require('../constants');

/**
 * Generate test data.
 */
function* generate() {
  logger.debug('Generating test data');

  yield models.sequelize.sync({ force: true });

  // Create users
  const users = Array(9).fill().map((e, i) => ({
    EID: `EID00${i + 1}`,
    name: `User 00${i + 1}`,
    role: constants.UserRoles.leader,
    status: constants.UserStatus.active,
    username: `user00${i + 1}`,
    password: helper.hashPassword('password'),
    createdBy: 'generate-test-data',
    updatedBy: 'generate-test-data',
    directorEID: 'EID001'
  }));
  users[0].role = constants.UserRoles.director; // EID001
  users[0].directorEID = null;
  users[1].role = constants.UserRoles.manager; // EID002
  users[6].role = constants.UserRoles.manager; // EID007
  users[8].deletedBy = 'generate-test-data';
  users[8].deletedAt = new Date();
  yield models.User.bulkCreate(users);

  // Create employees
  const employees = Array(9).fill().map((e, i) => ({
    EID: `EID00${i + 1}`,
    name: `Employee 00${i + 1}`,
    country: `Country ${(i % 2) + 1}`,
    division: `Division ${(i % 2) + 1}`,
    subGroup: `SubGroup ${(i % 2) + 1}`,
    profile: `Profile ${(i % 2) + 1}`,
    currentMaturity: `CurrentMaturity ${i + 1}`,
    expectedMaturity: `ExpectedMaturity ${i + 1}`,
    createdBy: 'generate-test-data',
    updatedBy: 'generate-test-data',
    managerEID: `EID00${(i % 2) === 0 ? '2' : '7'}` // EID002 or EID007
  }));
  yield models.Employee.bulkCreate(employees);

  // Create competencies
  const competencies = Array(9).fill().map((e, i) => ({
    id: i + 1,
    name: `Competency ${i + 1}`,
    description: `Description ${i + 1}`,
    createdBy: `EID00${(i % 2 === 0) ? 3 : 4}`, // EID003 or EID004
    updatedBy: `EID00${(i % 2 === 0) ? 3 : 4}` // EID003 or EID004
  }));
  yield models.Competency.bulkCreate(competencies);

  // Create sub competencies (3 for each of the first 3 competencies)
  const subCompetencies = competencies.slice(0, 3).map(competency => [
    {
      id: ((competency.id - 1) * 3) + 1,
      name: `Sub${competency.name}.1`,
      description: `Description ${((competency.id - 1) * 3) + 1}`,
      competencyId: competency.id,
      createdBy: competency.createdBy,
      updatedBy: competency.updatedBy
    },
    {
      id: ((competency.id - 1) * 3) + 2,
      name: `Sub${competency.name}.2`,
      description: `Description ${((competency.id - 1) * 3) + 2}`,
      competencyId: competency.id,
      createdBy: competency.createdBy,
      updatedBy: competency.updatedBy
    },
    {
      id: ((competency.id - 1) * 3) + 3,
      name: `Sub${competency.name}.3`,
      description: `Description ${((competency.id - 1) * 3) + 3}`,
      competencyId: competency.id,
      createdBy: competency.createdBy,
      updatedBy: competency.updatedBy
    }
  ]).reduce((a, b) => a.concat(b), []);
  yield models.SubCompetency.bulkCreate(subCompetencies);

  // Create levels (4 for each sub competency)
  const levels = subCompetencies.map(subCompetency => [
    {
      id: ((subCompetency.id - 1) * 4) + 1,
      level: 1,
      name: 'New To Skill',
      description: `Description ${((subCompetency.id - 1) * 4) + 1}`,
      subCompetencyId: subCompetency.id,
      createdBy: subCompetency.createdBy,
      updatedBy: subCompetency.updatedBy
    },
    {
      id: ((subCompetency.id - 1) * 4) + 2,
      level: 2,
      name: 'Basic',
      description: `Description ${((subCompetency.id - 1) * 4) + 2}`,
      subCompetencyId: subCompetency.id,
      createdBy: subCompetency.createdBy,
      updatedBy: subCompetency.updatedBy
    },
    {
      id: ((subCompetency.id - 1) * 4) + 3,
      level: 3,
      name: 'Intermediate',
      description: `Description ${((subCompetency.id - 1) * 4) + 3}`,
      subCompetencyId: subCompetency.id,
      createdBy: subCompetency.createdBy,
      updatedBy: subCompetency.updatedBy
    },
    {
      id: ((subCompetency.id - 1) * 4) + 4,
      level: 4,
      name: 'Advanced',
      description: `Description ${((subCompetency.id - 1) * 4) + 4}`,
      subCompetencyId: subCompetency.id,
      createdBy: subCompetency.createdBy,
      updatedBy: subCompetency.updatedBy
    }
  ]).reduce((a, b) => a.concat(b), []);
  yield models.SubCompetencyLevel.bulkCreate(levels);

  // Create activities (3 for each level)
  const activities = levels.map(level => [
    {
      id: ((level.id - 1) * 3) + 1,
      name: `Activity${level.name}.1`,
      subCompetencyLevelId: level.id,
      createdBy: level.createdBy,
      updatedBy: level.updatedBy,
      skillAcquired: `SkillAcquired ${((level.id - 1) * 3) + 1}`,
      lifeExperience: `LifeExperience ${((level.id - 1) * 3) + 1}`
    },
    {
      id: ((level.id - 1) * 3) + 2,
      name: `Activity${level.name}.2`,
      subCompetencyLevelId: level.id,
      createdBy: level.createdBy,
      updatedBy: level.updatedBy,
      skillAcquired: `SkillAcquired ${((level.id - 1) * 3) + 2}`,
      lifeExperience: `LifeExperience ${((level.id - 1) * 3) + 2}`
    },
    {
      id: ((level.id - 1) * 3) + 3,
      name: `Activity${level.name}.3`,
      subCompetencyLevelId: level.id,
      createdBy: level.createdBy,
      updatedBy: level.updatedBy,
      skillAcquired: `SkillAcquired ${((level.id - 1) * 3) + 3}`,
      lifeExperience: `LifeExperience ${((level.id - 1) * 3) + 3}`
    }
  ]).reduce((a, b) => a.concat(b), []);
  yield models.Activity.bulkCreate(activities);

  // Create logs
  const logs = Array(9).fill().map((e, i) => ({
    objectId: `ObjectId 00${(i % 3) + 1}`,
    objectName: `ObjectName 00${(i % 3) + 1}`,
    objectType: `ObjectType 00${(i % 3) + 1}`,
    dateTime: `2018-06-0${i + 1}`,
    userEID: `EID00${(i % 2 === 0) ? 3 : 4}`, // EID003 or EID004
    userName: `UserName 00${i + 1}`,
    operation: ['CREATE', 'UPDATE', 'DELETE'][i % 3]
  }));
  yield models.Log.bulkCreate(logs);

  // Create Completed Activities
  const completedActivities = Array(9).fill().map((e, i) => ({
    activityId: i + 1,
    employeeEID: 'EID004',
    completed: i % 2 === 0,
    createdBy: 'EID003',
    updatedBy: 'EID003'
  }));
  yield models.CompletedActivity.bulkCreate(completedActivities);

  // Create connections between employees and sub competencies
  const connections = employees.map((employee, index) => [
    {
      employeeEID: employee.EID,
      competencyId: 1,
      subCompetencyId: 1,
      currentMaturity: (index % 3) + 1,
      expectedMaturity: (index % 3) + 2,
      createdBy: 'EID003',
      updatedBy: 'EID003'
    },
    {
      employeeEID: employee.EID,
      competencyId: 1,
      subCompetencyId: 2,
      currentMaturity: 1,
      expectedMaturity: 3,
      createdBy: 'EID003',
      updatedBy: 'EID003'
    },
    {
      employeeEID: employee.EID,
      competencyId: 2,
      subCompetencyId: 4,
      currentMaturity: 2,
      expectedMaturity: 4,
      createdBy: 'EID004',
      updatedBy: 'EID004'
    }
  ]).reduce((a, b) => a.concat(b), []);
  yield models.EmployeeSubCompetency.bulkCreate(connections);

  logger.debug('Generating test data - Completed');
}

co(generate)
  .then(process.exit)
  .catch(logger.error);
