const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Comment = sequelize.define(
  "Comment",
  {
    UserId: {
      type: DataTypes.INTEGER,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    commentText: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = Comment;
