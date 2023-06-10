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


### !!!!  we can use ErrorRequestHandler for exchange Request,Response,NextFunction 


        const getUser:RequestHandler = async (req, res) => {
                try {
                 const data = await User.find()
                 res.send(data)
                } catch (error) {
                 res.status(400).send({ status: 'had an error in getUser Controller', error })
                }
        }

### We can use  type UserModel  = Model<IUser,Record<string,unknown>> in user.model.ts