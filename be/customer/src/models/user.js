"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
  User.init(
    {
      UserId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      nickName: DataTypes.STRING,
      birthday: DataTypes.DATE,
      phoneNumber: DataTypes.CHAR(250),
      email: DataTypes.STRING,
      AccountId: DataTypes.INTEGER,
      notifiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
