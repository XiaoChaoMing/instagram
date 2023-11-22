require("dotenv").config().parsed;

module.exports = {
  PORT: process.env.PORT,
  ACCESS_TOKKEN_KEY: process.env.ACCESS_TOKKEN_KEY,
  REFRESH_TOKKEN_KEY: process.env.REFRESH_TOKKEN_KEY,
};
