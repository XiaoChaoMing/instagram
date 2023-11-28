const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const Account = require("./Account");

const BanList = sequelize.define("BanLists", {}, { timestamps: true });

module.exports = BanList;
