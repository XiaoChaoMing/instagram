const express = require("express");
const app = express();
const port = 3001;

require("./bd-connection");
require("./associate");
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
