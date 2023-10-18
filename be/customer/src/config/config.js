require("dotenv").config().parsed;

module.exports = {
  PORT: process.env.PORT,
  APP_SECRET: process.env.APP_SECRET,
};
