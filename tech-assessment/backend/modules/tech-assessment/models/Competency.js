/**
 * Schema for Competency.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Competency', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(245), allowNull: false },
    description: { type: DataTypes.STRING(2048), allowNull: false },
    createdBy: { type: DataTypes.STRING(45), allowNull: false },
    updatedBy: { type: DataTypes.STRING(45), allowNull: false }
  });
