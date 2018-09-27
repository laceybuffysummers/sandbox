/**
 * Schema for Employee Sub Competency (join table between Employee and SubCompetency).
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('EmployeeSubCompetency', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    subCompetencyId: { type: DataTypes.BIGINT, allowNull: false },
    currentMaturity: { type: DataTypes.BIGINT, allowNull: true },
    expectedMaturity: { type: DataTypes.BIGINT, allowNull: true },
    createdBy: { type: DataTypes.STRING(45), allowNull: false },
    updatedBy: { type: DataTypes.STRING(45), allowNull: false }
  });
