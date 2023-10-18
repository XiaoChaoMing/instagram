const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Comment = sequelize.define(
  "Comment",
  {
    commentText: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = Comment;
