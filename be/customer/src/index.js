const express = require("express");
const app = express();
const port = 3001;
const customer = require("./api");
require("./bd-connection");
require("./associate");
app.use(express.json());
app.use(cors());
customer(app);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
