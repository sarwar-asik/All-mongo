const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);

const url = process.env.URL;

mongoose
  .connect(url, {
    dbName: "NodeMongo2Product",
  })
  .then(() => {
    console.log("Connected DataBase".green.bold);
  })
  .catch((err) => {
    const { name, stack, message } = err;
    console.log("Not Connected Database ", { name, message, stack });
  });

app.get("/", async (req, res) => {
  res.send(`Product Server is Running on ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is connected with ${PORT}`.green.bold);
});
