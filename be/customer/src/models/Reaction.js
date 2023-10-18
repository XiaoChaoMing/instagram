const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Reaction = sequelize.define("Reaction", {}, { timestamps: true });

module.exports = Reaction;
