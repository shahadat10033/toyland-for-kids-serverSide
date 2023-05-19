const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express());

app.get("/", (req, res) => {
  res.send("Hello from kids toyLand server!");
});

app.listen(port, () => {
  console.log(` kids toyLand  is running on port ${port}`);
});
