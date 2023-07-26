## Ready Server :::::

## Ready with esliint ,logger ,global errorhandle , uncaught error,Zod

\*\* just clone the server for >>>>

### Features of src>app>modules>AUTH> :::

** User Login
** User Signup
\*\* Get refresh token

### Features of src>app>modules>USER(by admin ) :::

** create user
** user profile (any user)
** update profile (any user)
** update user (admin)
** allUser (admin)
** delete user (admin)
\*\* get single user (admin )

### .env (sample just )

    DB_URL='mongodb+sdfasdfawrfqawe1ertwer5454634534352345'
    NODE_ENV= development
    PORT = 5000


    JWT_SECRET = 'type_secret'
    JWT_EXPIRES_IN=1d
    JWT_REFRESH_SECRET='very-refresh-secret'
    JWT_REFRESH_EXPIRES_IN=365d

## Vercel hosting the server

### Vercel এ ডেপ্লয় এর ক্ষেত্রে কয়েকটি জিনিস খেয়ালরাখতে হবে Sits config.jso ("./dist" is very important)

    "module": "commonjs" / Specify what module code is generated. */*,

    "rootDir": "./src" / Specify the root folder

    within your source files. /*, "outDir": "./dist" */ Specify an output folder

    for all emitted files. */*,

### এই কনফিগটি add করে নিতে হবে যদি আগে থেকে করা না থাকে

### ২। package.json এর মধ্যে

        "scripts": {

        "dev": "ts-node-dev --respawn --transpile-only src/server.ts",

        "start": "node dist/server.js",

        "build": "tsc"
        }

### ৩। প্রজেক্টের রুট এর মধ্যে vercel.json ফাইল বানিইয়ে নিতে হবে

        {

            "version": 2,
            "builds": [
                {
                    "src": "dist/server.js",
                    "use": "@vercel/node"
                }
            ],
            "routes": [
                {
                    "src": "/(.*)",
                    "dest": "dist/server.js"
                }
            ]
        }

### এরপর Cli দিয়ে deploy করে নিলেই কাজ শেষ

             tsc
             vercel
             vercel --prod
