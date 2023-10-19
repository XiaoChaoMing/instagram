const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = require("./config/config");
const expressApp = require("./express-app");

require("./bd-connection");
require("./associate");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    nitify: "trang chu",
  });
});
expressApp(app);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
