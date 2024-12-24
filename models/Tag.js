const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Tag extends Model {}

Tag.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
  },
}, {
  sequelize,
  modelName: 'Tag',
});

module.exports = Tag;
