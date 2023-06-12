## Install for setup the project ===>

#### 1 .

        npm init -y

#### 2 .

     npm install express --save

#### 3 .

         npm i express mongoose

#### 4 . (for ts)

        tsc --init

#### 5 . (change in tsconfig )

          "rootDir":"/src"
          "outDir":"/dist"

#### 6 . (install)

         yarn add dotenv
         yarn add cors with <npm i --save-dev @types/cors>

         yarn add ts-node-dev --dev

#### 7 . (package.json)

     "start":"ts-node-dev --respawn --transpile-only server.ts"

### !!!! we can use ErrorRequestHandler for exchange Request,Response,NextFunction

        const getUser:RequestHandler = async (req, res) => {
                try {
                 const data = await User.find()
                 res.send(data)
                } catch (error) {
                 res.status(400).send({ status: 'had an error in getUser Controller', error })
                }
        }

### We can use type UserModel = Model<IUser,Record<string,unknown>> in user.model.ts

# Create a global async function in src>app>shared>catchAsync :::::

         import { NextFunction, Request, RequestHandler, Response } from "express"

        const catchAsync=(fn:RequestHandler)=>{
        return async (req:Request,res:Response,next:NextFunction)=>{
                try {
                await  fn(req,res,next)

                } catch (error) {
                next(error)

                }
        }
        }

        export default catchAsync

### after create src>app>shared>catchAsync we can use it in controller ::::

        const createUser = catchAsync(async (req: Request, res: Responsenext:NextFunction) => {
                const user = req.body;


                const result = await UserService.createUserServices(user);
                next()
                if (result) {res.status(200).send({success: true,message:'successfully data: result,
                  });
                 }
        });

## global res.send create in src>app>shared>senResponse.ts ::::

                import { Response } from 'express';


                type IApiResponse<T>={
                        statusCode: number;
                        success: boolean;
                        message?: string | null;
                        data: T|null;
                }


                const sendResponse = <T>( res: Response, data:IApiResponse<T> ): void => {
                const ResponseData :IApiResponse<T> ={
                statusCode: data.statusCode,
                success: data.success,
                message: data.message || null,
                data: data.data || null,
                }
                res.status(data.statusCode).json(ResponseData);
                };

                export default sendResponse;

       use in controller >>>>>>>>

         sendResponse(res,{success:true,message:"successfully create semester",statusCode:200,data:result})
