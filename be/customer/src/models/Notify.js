const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Notify = sequelize.define("Notify", {}, { timestamps: true });

module.exports = Notify;
