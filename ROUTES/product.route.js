const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.post("/addProduct", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    const { name, message, stack } = error;
    console.log({ name, message, stack });
  }
});
