import mongoose from "mongoose";
import config from "./config.ts";
import "colors";

import app from "./app";
const port = process.env.DB_URL || 5000;

async function mainFUnction() {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("db COnnected successfully ".red.underline.bold);
    app.listen(config.port, () => {
      console.log(`server app listening on port ${config.port}`.red.underline.bold);
    });
  } catch (error) {
    // const  {name,message,stack}=error;
    console.log("failed to connect ", error);
  }
}

mainFUnction();
