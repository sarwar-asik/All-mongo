
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



## Global Error handle customize system  (system-2) 

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
    

    import { ErrorRequestHandler } from 'express'
    import config from '../../../src/config.ts/index'
    import { IGenericErrorMessage } from '../../interfaces/Ierror'
    import handleValidationError from '../../errors/handleValidationError'
    import ApiError from '../../errors/ApiError'



    const GlobalHandler:ErrorRequestHandler = (error ,req, res,next) => {

        let statusCode = 500
        let message = 'Something went wrong'

        let errorMessage: IGenericErrorMessage[] = []

        if (error?.name === 'ValidatorError') {
            const simplifiedMessage = handleValidationError(error)
            statusCode = simplifiedMessage?.statusCode
            message = simplifiedMessage?.message


        } else if (error instanceof ApiError) {
            statusCode = error?.statusCode
            message = error?.message
            errorMessage = error?.message ? [{ path: '', message: message }] : []
        } else if (error instanceof Error) {
            message = error.message
            errorMessage = error?.message ? [{ path: '', message: error?.message }] : []
        }

        

        res.status(statusCode).json({
            success: false,
            message,
            errorMessage,
            stack: config.env !== 'production' ? error?.stack : undefined,
        })

        next()
    }



    export default GlobalHandler


### handle uncaught and other error handle in server.ts (you can use console.log() exchange logger & errorLogger)


        /* eslint-disable no-console */
        import mongoose from 'mongoose'
        import config from './config.ts'
        import 'colors'
        import { logger, errorLogger } from './shared/logger'
        import app from './app'
        import { Server } from 'http'


        process.on("uncaughtException",err=>{

        errorLogger.error('UnCaught rejection is detected from serve.ts',err)
        process.exit(1)
        })

        let server: Server

        async function mainFUnction() {

        try {
            await mongoose.connect(config.data_url as string, {
            dbName: 'University-management',
            })

            logger.info('db Connected successfully '.green.underline.bold)

            server = app.listen(config.port, () => {
            logger.info(`server app listening on port ${config.port}`.green.bold)
            })
        } catch (error) {
            // const  {name,message,stack}=error;
            errorLogger.error('failed to connect '.red.underline, error)
        }

        process.on('unhandledRejection', error => {
            // eslint-disable-next-line no-console
            console.log('UnHandle rejection is detected and closing the main() in serve.ts')
            if (server) {
            server.close(() => {
                errorLogger.error(error)
                process.exit(1)
            })
            } else {
            process.exit(1)
            }
        })
        }

       
        process.on("SIGTERM",()=>{
        logger.info("SIGTERM is received ")
        if(server){
            server.close()
        }
        })




        // console.log(config.port,"url".green.bold);

        mainFUnction()




### for handle error for  unknown apiii hit error handle in app.ts 

        app.use((req: Request, res: Response, next: NextFunction) => {
                res.status(httpStatus.NOT_FOUND).json({
                        success: false,
                        message: 'NOt Found',
                        errorMessages: [
                        {
                         path:req.originalUrl,
                         message: 'API Not Found',
                        },
                        ],
                });
                next();
        });
