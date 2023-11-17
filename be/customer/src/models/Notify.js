const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const Notify = sequelize.define(
  "Notify",
  {},
  { timestamps: true, hasTrigger: true }
);

module.exports = Notify;
