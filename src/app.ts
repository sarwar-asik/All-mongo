import httpStatus from 'http-status';
// const express = require('express')
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import GlobalHandler from './app/middlesWare/globalErrorHandler';

import routes from './app/routes';
import sendResponse from './shared/sendResponce';
// import { createUser } from './app/modules/users/users.services'

const app: Application = express();
// const port = 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application

// app.use('/api/v1/users', UserRouter)
// app.use("/api/v1/semester",semesterRouter)

//*** */ or ***////
app.use('/api/v1', routes);

app.get('/', async (req: Request, res: Response) => {
  //  const addUser = await createUser({id:"445",role:"admin",password:"asdfasdf"})

  // res.send(addUser)
  // throw new ApiError(400, 'Error from app.ts')
  // Promise.reject(new Error('Unhandle Promise from app.ts'))

  // throw new Error("Error from app.get")
  // next("next error")
  sendResponse(res, {
    success: true,
    message: 'Running the University Management Server',
    statusCode: 201,
    data:null
  });
  // next();
});

app.use(GlobalHandler);

// for unknown apiii hit error handle
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

export default app;
