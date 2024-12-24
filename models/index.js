const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');

Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

Post.belongsToMany(Tag, { through: 'PostTags' });
Tag.belongsToMany(Post, { through: 'PostTags' });

module.exports = { User, Post, Tag };
