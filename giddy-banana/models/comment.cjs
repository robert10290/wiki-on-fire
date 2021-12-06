module.exports = (db) => {
  db.Article.belongsToMany(db.User, { through: "Comment" });
  db.User.belongsToMany(db.Article, { through: "Comment" });
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    ArticleId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    contents: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
