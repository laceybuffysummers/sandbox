/**
 * Schema for User.
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    EID: { type: DataTypes.STRING(45), primaryKey: true },
    name: { type: DataTypes.STRING(245), allowNull: false },
    role: { type: DataTypes.STRING(45), allowNull: false },
    status: { type: DataTypes.STRING(45), allowNull: false },
    username: { type: DataTypes.STRING(245), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(1024), allowNull: false }, // Hashed
    createdBy: { type: DataTypes.STRING(45), allowNull: false },
    updatedBy: { type: DataTypes.STRING(45), allowNull: false },
    deletedBy: DataTypes.STRING(45)
  }, {
    paranoid: true // for soft delete
  });
