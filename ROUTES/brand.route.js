const express = require("express");
const router = express.Router();
const brandController = require("../CONTROLLER/brand.controller");

router
  .route("/")
  .get(brandController.getBrand)
  .post(brandController.createBrand);

module.exports = router;
