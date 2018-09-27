/**
 * Schema for Employee.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Employee', {
    EID: { type: DataTypes.STRING(45), primaryKey: true },
    name: { type: DataTypes.STRING(245), allowNull: false },
    country: { type: DataTypes.STRING(245), allowNull: false },
    division: { type: DataTypes.STRING(245), allowNull: false },
    subGroup: { type: DataTypes.STRING(245), allowNull: false },
    profile: { type: DataTypes.STRING(245), allowNull: false },
    createdBy: { type: DataTypes.STRING(45), allowNull: false },
    updatedBy: { type: DataTypes.STRING(45), allowNull: false }
  });
