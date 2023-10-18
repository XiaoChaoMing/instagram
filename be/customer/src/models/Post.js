const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Post = sequelize.define(
  "Post",
  {
    Status: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = Post;
