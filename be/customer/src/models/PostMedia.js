"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PostType.hasOne(Account.AccountId);
    }
  }
  PostType.init(
    {
      PostMediaId: DataTypes.INTEGER,
      PostId: DataTypes.STRING,
      MediaFile: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "PostType",
    }
  );

  return PostType;
};
