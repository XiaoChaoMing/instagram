const Account = require("./../models/Account");
const User = require("./../models/User");
class CustomerService {
  async CreateAccount(accountInfo) {
    const { userName, Password } = accountInfo;
    await Account.create({ userName: userName, Password: Password });
  }

  async checkAccountId(AccountId) {
    Account.findAll({
      where: {
        id: AccountId,
      },
    });
  }

  async CreateUser(userInfo) {
    const { firtsName, lastName, nickName, Avatar, birthDay, phoneNum, Email } =
      userInfo;
  }
}
module.exports = CustomerService;
