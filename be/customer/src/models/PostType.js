const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const PostType = sequelize.define(
  "PostType",
  {
    Type: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = PostType;
