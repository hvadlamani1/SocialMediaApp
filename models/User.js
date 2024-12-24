const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); // Ensure this points to the correct database file

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(64),
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(120),
    unique: true,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING(256),
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
