const CustomerRepository = require("./../repository/Customer-repository");
const ProfileRepository = require("../repository/UserProfile-repository");
const AccountRepository = require("./../repository/Account-repository");
const FolowRepository = require("./../repository/Follower-repository");
const PostRepository = require("./../repository/Post-repository");
const UserProfileRepository = require("../repository/UserProfile-repository");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateAccessTokken,
  FormateData,
  GenerateRefreshTokken,
} = require("./../utils/index");
class CustomerService {
  constructor() {
    this.customerRepo = new CustomerRepository();
    this.ProfileRepo = new ProfileRepository();
    this.AccountRepo = new AccountRepository();
    this.FollowRepo = new FolowRepository();
    this.UserProfileRepo = new UserProfileRepository();
    this.PostRepo = new PostRepository();
  }

  async SignIn(userInput) {
    const { userName, Password } = userInput;
    const existAccount = await this.AccountRepo.getAccountByUserName(userName);
    console.log(existAccount[0]);
    if (existAccount.length > 0) {
      const validPassword = await ValidatePassword(
        Password,
        existAccount[0].Password,
        existAccount[0].Salt
      );
      if (validPassword) {
        const token = await GenerateAccessTokken({
          userName: existAccount[0].userName,
        });
        if (existAccount[0].RefreshTokken === null) {
          const refreshToken = await GenerateRefreshTokken({
            userName: userName,
          });
          await this.AccountRepo.updateAccount({ userName, refreshToken });
        }
        console.log("accessToken:" + token);
        return FormateData({
          id: existAccount[0].id,
          userName: existAccount[0].userName,
          token,
          fullName: existAccount[0].firstName + " " + existAccount[0].lastName,
          Avatar: existAccount[0].Avatar,
          nickName: existAccount[0].nickName,
        });
      }
    }
  }
  async Register(accountInfo) {
    const {
      userName,
      Password,
      firstName,
      lastName,
      Avatar,
      birthDay,
      sexual,
    } = accountInfo;
    const salt = await GenerateSalt();
    const userPassword = await HashPassword(Password, salt);
    const unq = await this.AccountRepo.createAccount({
      userName,
      userPassword,
      salt,
    });
    if (unq != 0) {
      const accountId = await this.AccountRepo.getAccountId();
      await this.customerRepo.createUser({
        firstName,
        lastName,
        Avatar,
        birthDay,
        sexual,
        accountId,
      });
    } else {
      return 0;
    }

    return unq;
  }
  async Following(userinput) {
    const { followerId, followingId } = userinput;
    return await this.FollowRepo.folowing({ followerId, followingId });
  }
  async unFollowing(userinput) {
    const { followerId, followingId } = userinput;
    return await this.FollowRepo.unFolowing({ followerId, followingId });
  }
  async updateUserProfile(userinput) {
    const {
      userId,
      firstName,
      lastName,
      Avatarurl,
      birthDay,
      sexual,
      Country,
      phoneNum,
      Email,
      nickName,
      Description,
    } = userinput;
    await this.customerRepo.updateUser({
      firstName,
      lastName,
      Avatarurl,
      birthDay,
      sexual,
      userId,
    });
    await this.UserProfileRepo.updateUserProfile({
      Country,
      phoneNum,
      Email,
      nickName,
      Description,
      userId,
    });
  }
  async getProfileUser(id) {
    const user = await this.customerRepo.getUserProfile(id);
    return FormateData(user);
  }
  async Follower(id) {
    return await this.FollowRepo.getFollower(id);
  }
  async getTopFollowers(id) {
    return await this.FollowRepo.getHighestFollowing(id);
  }
}
module.exports = CustomerService;
