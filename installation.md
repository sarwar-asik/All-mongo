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

#### 8 . Eslint (ts.config) and create { .eslintrc}

          "include": ["src"], // which files to compile
         "exclude": ["node_modules"], // which files to skip

        npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev


        finally for organize your code by >>>>>> npx prettier --write src/index.ts


# logger (for store all console.log)

               npm i winston
               create src/shared/logger.ts
               use >>> logger.info("successfully connected data")

# logger (saparate the error in separate file)

          import path from "path"

         transports: [
           new winston.transports.Console(),
            new winston.transports.File({
                 filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
                    level: 'info',
          }),

],

## Global Error handle

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
