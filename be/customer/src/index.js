const express = require("express");
const app = express();
const port = 3001;
const db = require("./models");
app.use(express.json());
const Connect = require("./bd-connection");
Connect();

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
