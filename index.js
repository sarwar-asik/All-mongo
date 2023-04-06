const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jobSchema = require("./Schema/Schema1");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 30002;

// middleware //

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);


// use mongoose middleware ////

jobSchema.post("save",function(next){
  console.log("click on post in jobRouter");
  next()
})
// instance method
jobSchema.method.logger = function(){
    console.log(`clicked on post for ${this.name}`);
}