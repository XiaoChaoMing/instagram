const Account = require("./../models/Account");
const User = require("./../models/User");
class CustomerRepository {
  async createAccount(userInput) {
    const {
      userName,
      userPassword,
      salt,
      firstName,
      lastName,
      Avatar,
      birthDay,
      phoneNum,
      Email,
    } = userInput;
    const unq = await this.checkUniqueUserName(userName);
    if (!unq) {
      await Account.create({
        userName: userName,
        Password: userPassword,
        Salt: salt,
      });
      await User.create({
        firstName: firstName,
        lastName: lastName,
        Avatar: Avatar,
        birthDay: birthDay,
        phoneNum: phoneNum,
        Email: Email,
        accountId: await this.getAccount(),
      });
      console.log();

      return true;
    } else {
      return false;
    }
  }
  async getAccount() {
    const entries = await Account.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
    });
    if (entries.length > 0) {
      const acc = entries[0];
      return acc.id;
    }
  }
  async checkUniqueUserName(userName) {
    const existUser = await Account.findAll({
      where: {
        userName: userName,
      },
    });
    return existUser.length > 0 ? true : false;
  }
}

module.exports = CustomerRepository;
