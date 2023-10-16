"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(Account.AccountId);
    }
  }
  Album.init(
    {
      AlbumId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Album",
    }
  );

  return Album;
};
