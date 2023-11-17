const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const Notify = require("./Notify");
const Follower = require("./Follower");

const Post = sequelize.define(
  "Post",
  {
    Status: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    hasTrigger: true,
    hooks: {
      afterCreate: async (post, options) => {
        const following = await Follower.findAll({
          where: {
            folowerId: post.userId,
          },
        });
        following.forEach(async (follow) => {
          await Notify.create({
            notifyTypeId: 1,
            fromUserId: follow.folowerId,
            userId: follow.followingId,
          });
        });
      },
    },
  }
);

module.exports = Post;
