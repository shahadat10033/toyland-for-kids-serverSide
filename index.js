const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from toyLand for kids server!");
});

app.listen(port, () => {
  console.log(`toyLand for kids is running on port ${port}`);
});
