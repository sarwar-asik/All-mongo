import mongoose from "mongoose";
import config from "./config.ts";
import "colors";

import app from "./app";

async function mainFUnction() {
  try {
    await mongoose.connect(config.data_url as string,{
      dbName:"University-management"
    });
    console.log("db Connected successfully ".red.underline.bold);
    app.listen(config.port, () => {
      console.log(`server app listening on port ${config.port}`.red.underline.bold);
    });
  } catch (error) {
    // const  {name,message,stack}=error;
    console.log("failed to connect ".red, error);
}
}


// console.log(config.port,"url".green.bold);


mainFUnction();
