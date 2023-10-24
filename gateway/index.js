const express = require("express");
const app = express();
const port = 8000;
app.listen(port, () => {
  res.json({
    status: 200,
    description: "conect from gateway",
  });
});
