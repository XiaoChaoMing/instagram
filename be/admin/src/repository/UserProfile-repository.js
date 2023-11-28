const UserProfile = require("../models/UserProfile");

const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("../utils/index");
class UserProfileRepository {
  async createUserProfile(userInput) {
    const { country, phoneNum, email, nickname, description, userid } =
      userInput;
    await UserProfile.create({
      Country: country,
      phoneNUm: phoneNum,
      Email: email,
      nickName: nickname,
      Description: description,
      userId: userid,
    });
  }
  async updateUserProfile(userInput) {
    const { Country, phoneNum, Email, nickName, Description, userId } =
      userInput;
    await UserProfile.update(
      {
        Country: Country,
        phoneNUm: phoneNum,
        Email: Email,
        nickName: nickName,
        Description: Description,
      },
      {
        where: { userId: userId },
      }
    );
  }
  async getProfileById(id) {
    const profile = await UserProfile.findAll({
      where: { userId: id },
    });
    return profile[0];
  }
  async getUserbyId(id) {
    await UserProfile.findAll({
      where: {
        id: id,
      },
    });
  }
}

module.exports = UserProfileRepository;
