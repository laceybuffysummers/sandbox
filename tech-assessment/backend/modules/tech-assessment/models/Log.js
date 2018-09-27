/**
 * Schema for Log.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('Log', {
    objectId: { type: DataTypes.STRING(45), allowNull: false },
    objectName: { type: DataTypes.STRING(245), allowNull: false },
    objectType: { type: DataTypes.STRING(45), allowNull: false },
    dateTime: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    userEID: { type: DataTypes.STRING(45), allowNull: false },
    userName: { type: DataTypes.STRING(245), allowNull: false },
    operation: { type: DataTypes.STRING(6), allowNull: false }
  }, {
    timestamps: false
  });
