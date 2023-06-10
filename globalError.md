
# Global Error handle 

## (System-1) Global Error handle  in app.ts>> 

          class ApiError extends Error{
                statusCode:number;
                constructor(statusCode:number,message:string|undefined,stack=""){
                    super(message)
                    this.statusCode= statusCode;
                        if(stack){
                            this.stack = stack
                        }
                        else{
                            Error.captureStackTrace(this,this.constructor)
                        }
                }
          }


          app.get('/',  (req: Request, res: Response,next:NextFunction) => {
            //  const addUser = await createUser({id:"445",role:"admin",password:"asdfasdf"})

            // res.send(addUser)
            throw new ApiError(400,"Error from app.ts")
            // throw new Error("Error from app.get")
            // next("next error")



            // res.send({ status: true, data: 'Database connected ' })
          })

          app.use((err,req: Request, res: Response,next:NextFunction)=>{

            console.log("err");
            if(err instanceof Error){
            res.status(400).json({errorr:err})
            }
            else{
            res.status(500).json({error:"Something went wrong"})
            }
          })



## Global Error handle  (system-2) 

### >>> use in app.use
            app.use(GlobalHandler)
### >>> Create interfaces in src>app>interfaces>IError.ts   
    export type IGenericErrorMessage ={
        path:string ;
        message:string
    }  

### >>> Create interfaces in src>app>interfaces>ICommon.ts.ts 
    import { IGenericErrorMessage } from "./Ierror";

    export type IGenericResponse ={
        statusCode:number;
            message:string;
            // errorMessages:{
            //     path:string,
            //     message:string
            // }[]
        errorMessages:IGenericErrorMessage[]
    }


### >>>> user in src>app>errors>handleValidationError.ts
    import mongoose from "mongoose"
    import { IGenericErrorMessage } from "../interfaces/Ierror"
    import { IGenericResponse } from "../interfaces/ICommon";

    const handleValidationError = (err: mongoose.Error.ValidationError):IGenericResponse => {
         const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
            (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
                return {
                    path: element?.path,
                    message: element?.message
                };
            }
         );
    
        const statusCode =400;
        return {
            statusCode,
            message:"Validation Error",
            errorMessages:errors
        }
    };

### create src/app/middleware/globalErrorhandler.ts

      !!  we can use ErrorRequestHandler for exchange Request,Response,NextFunction !!



