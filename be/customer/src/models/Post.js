const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const Notify = require("./Notify");
const Post = sequelize.define(
  "Post",
  {
    Status: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    hooks: {
      afterCreate: async (post, options) => {
        await Notify.create({
          notifyTypeId: 1,
          userId: post.userId,
        });
      },
    },
  }
);

module.exports = Post;
