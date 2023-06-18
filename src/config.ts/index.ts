/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';
// dotenv.config({path:process.cwd()})

// dotenv.config({ path: path.join(process.cwd(), "env") });
dotenv.config({ path: path.join(process.cwd(), '.env') });

// console.log(process.env);

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT ,
  data_url: process.env.DB_URL,
  default_user_pass: process.env.DEFAULT_STUDENT_PASSWORD,
};
