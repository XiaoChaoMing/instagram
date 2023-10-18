const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Album = sequelize.define("Album", {}, { timestamps: true });

module.exports = Album;
