require("dotenv").config();
const express = require("express");
const router = require("./src/routes/index");
require("./src/config/db")
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Apis are working.");
});

process.on('uncaughtException', (err) => {
    err.controller = 'uncaughtException';
    console.log(err)
  });

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
