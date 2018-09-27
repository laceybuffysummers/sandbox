/**
 * Schema for Activity.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Activity', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(245), allowNull: false },
    skillAcquired: { type: DataTypes.STRING(245), allowNull: false },
    lifeExperience: { type: DataTypes.STRING(245), allowNull: false },
    createdBy: { type: DataTypes.STRING(45), allowNull: false },
    updatedBy: { type: DataTypes.STRING(45), allowNull: false }
  });
