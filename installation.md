

## Install for setup the project  ===>

 #### 1 .
                
        npm init -y 

#### 2 . 

     npm install express --save
                
#### 3 .
         npm i express mongoose

#### 4  . (for ts)
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
        
