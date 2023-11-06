const User = require("./models/User");
const Account = require("./models/Account");
const Comment = require("./models/Comment");
const Follower = require("./models/Follower");
const Message = require("./models/Message");
const Notify = require("./models/Notify");
const NotifyType = require("./models/NotifyType");
const Post = require("./models/Post");
const PostMedia = require("./models/PostMedia");
const PostType = require("./models/PostType");
const Reaction = require("./models/Reaction");
const UserProfile = require("./models/UserProfile");
const BanList = require("./models/BanList");
const sequelize = require("./bd-connection");
const associate = () => {
  User.belongsTo(Account, {
    foreignKey: "accountId",
    targetKey: "id",
  });
  UserProfile.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
  });
  Follower.belongsTo(User, {
    foreignKey: "folowerId",
    targetKey: "id",
  });
  Follower.belongsTo(User, {
    foreignKey: "followingId",
    targetKey: "id",
  });
  // Album.belongsTo(User, {
  //   foreignKey: "userId",
  //   targetKey: "id",
  // });
  // Album.belongsTo(Post, {
  //   foreignKey: "postId",
  //   targetKey: "id",
  // });
  BanList.belongsTo(Account, {
    foreignKey: "accountId",
    targetKey: "id",
  });

  Post.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
  });
  Post.belongsTo(PostType, {
    foreignKey: "postTypeId",
    targetKey: "id",
  });
  PostMedia.belongsTo(Post, {
    foreignKey: "PostId",
    targetKey: "id",
  });
  Comment.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
  });
  Comment.belongsTo(Post, {
    foreignKey: "postId",
    targetKey: "id",
  });
  Reaction.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
  });
  Reaction.belongsTo(Post, {
    foreignKey: "postId",
    targetKey: "id",
  });
  Message.belongsTo(User, {
    foreignKey: "fromUserId",
    targetKey: "id",
  });
  Message.belongsTo(User, {
    foreignKey: "toUserId",
    targetKey: "id",
  });
  Notify.belongsTo(NotifyType, {
    foreignKey: "notifyTypeId",
    targetKey: "id",
  });
  Notify.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
  });
  sequelize
    .sync()
    .then(() => {
      console.log("Đồng bộ thành công");
    })
    .catch((err) => {
      console.log(err);
    });
  // drop all table
  // sequelize
  //   .sync() // create the database table for our model(s)
  //   .then(function () {
  //     // do some work
  //   })
  //   .then(function () {
  //     return sequelize.drop(); // drop all tables in the db
  //   });
};
associate();
