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
      TypeId: DataTypes.INTEGER,
      Type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PostType",
    }
  );

  return PostType;
};
