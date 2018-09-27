/**
 * Initialize and export all model schemas.
 */
const config = require('config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.dbUrl, {
  logging: false,
  operatorsAliases: false,
  dialectOptions: { encrypt: true }
});
const models = { sequelize };

// Import definitions
models.User = sequelize.import('./User');
models.Employee = sequelize.import('./Employee');
models.Activity = sequelize.import('./Activity');
models.CompletedActivity = sequelize.import('./CompletedActivity');
models.Competency = sequelize.import('./Competency');
models.SubCompetency = sequelize.import('./SubCompetency');
models.SubCompetencyLevel = sequelize.import('./SubCompetencyLevel');
models.Log = sequelize.import('./Log');
models.EmployeeSubCompetency = sequelize.import('./EmployeeSubCompetency');

// Define associations
models.User.belongsTo(models.User, { as: 'director', foreignKey: 'directorEID' });
models.Employee.belongsTo(models.User, { as: 'manager', foreignKey: 'managerEID' });
models.Employee.belongsToMany(models.Activity, { through: models.CompletedActivity, foreignKey: 'employeeEID' });
models.Activity.belongsToMany(models.Employee, { through: models.CompletedActivity, foreignKey: 'activityId' });
models.SubCompetency.belongsTo(models.Competency, { as: 'competency', foreignKey: 'competencyId', onDelete: 'cascade' });
models.SubCompetencyLevel.belongsTo(models.SubCompetency, { as: 'subCompetency', foreignKey: 'subCompetencyId', onDelete: 'cascade' });
models.Activity.belongsTo(models.SubCompetencyLevel, { as: 'subCompetencyLevel', foreignKey: 'subCompetencyLevelId', onDelete: 'cascade' });
models.Employee.belongsToMany(models.Competency, { through: { model: models.EmployeeSubCompetency, unique: false }, foreignKey: 'employeeEID' });
models.Competency.belongsToMany(models.Employee, { through: { model: models.EmployeeSubCompetency, unique: false }, foreignKey: 'competencyId' });
module.exports = models;
