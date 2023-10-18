const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = require("./config/config");
const expressApp = require("./express-app");

require("./bd-connection");
require("./associate");
app.use(express.json());
app.use(cors());
expressApp(app);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
