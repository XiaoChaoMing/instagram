const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Message = sequelize.define(
  "Message",
  {
    messageId: {
      type: DataTypes.INTEGER,
    },
    messageText: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = Message;
