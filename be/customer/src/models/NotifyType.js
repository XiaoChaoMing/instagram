const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const NotifiType = sequelize.define(
  "NotifiType",
  {
    notiName: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = NotifiType;
