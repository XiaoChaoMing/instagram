const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Post = sequelize.define(
  "Post",
  {
    Userid: {
      type: DataTypes.INTEGER,
    },
    Status: {
      type: DataTypes.STRING,
    },
    typeId: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

module.exports = Post;
