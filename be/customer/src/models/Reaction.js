const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Reaction = sequelize.define(
  "Reaction",
  {
    UserId: {
      type: DataTypes.INTEGER,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

module.exports = Reaction;
