const express = require("express");
const router = express.Router();
const brandController = require("../CONTROLLER/brand.controller")



router.post("/",brandController.createBrand)

module.exports = router