
import { User } from "./users.model";
import { IUser } from "./users.interface";

import  config  from "../../../config.ts/index";
import { generateUserId } from "./user.utils";


 const createUser = async(user:IUser):Promise<IUser |null >=>{
   

    if(!user?.password){
        user.password = config.default_user_pass as string
    }
    const id = generateUserId()


    
   const createdUser  = await User.create(user)
   if(!createdUser){
        throw new Error("Failed to create new User")
   }
   return createdUser

}



export default { createUser}