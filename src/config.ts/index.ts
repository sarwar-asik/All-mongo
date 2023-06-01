import dotenv from "dotenv";
import path from "path";
// dotenv.config({path:process.cwd()})
dotenv.config({ path: path.join(process.cwd(), "env") });


export default {
    port:process.env.PORT,
    data_url:process.env.DB_URL,
    
}