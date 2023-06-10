

####  Eslint (ts.config) and create { .eslintrc}

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

### >>>> .eslintrc 

       
    {
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
          "ecmaVersion": 12,
          "sourceType": "module",
        },
        "plugins": ["@typescript-eslint"],
        "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      
        "rules": {
          "no-unused-vars": "error",
          "prefer-const":"error",
          "no-unused-expressions":"error",
          "no-undef":"error",
          "no-console":"error",
          "@typescript-eslint/consistent-type-definitions": ["error", "type"] ,

          // "@typescript-eslint/no-unused-vars": "error",
          // to enforce using type for object type definitions, can be type or interface 

          // "no-unreachable":"error",
          // // to enforce using type for object type definitions, can be type or interface 
          //  "consistent-type-definitions": ["error", "type"]
        },
      
        "env": {
          "browser": true,
          "es2021": true,
          "node":true
        },
        "globals": {
          "process":"readonly"
        }
      }
