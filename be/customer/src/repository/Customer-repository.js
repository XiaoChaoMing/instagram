const { Model } = require("sequelize");
const { User, Account } = require("./../models");
class CustomerRepository {
  async CreateAccount(accountInfo) {
    const { userName, password } = accountInfo;
    await Account.create({ userName: "Jane", Password: "Doe" });
  }
}

module.exports = CustomerRepository;
