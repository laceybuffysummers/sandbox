/**
 * Schema for Completed Activity (join between Employee and Activity).
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('CompletedActivity', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    completed: { type: DataTypes.BOOLEAN, allowNull: false },
    createdBy: { type: DataTypes.STRING(45), allowNull: false },
    updatedBy: { type: DataTypes.STRING(45), allowNull: false }
  });
