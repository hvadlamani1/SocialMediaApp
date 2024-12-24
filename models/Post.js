const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING(150),
  },
  happinessLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
  },
  body: {
    type: DataTypes.STRING(1500),
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Post',
});

module.exports = Post;
