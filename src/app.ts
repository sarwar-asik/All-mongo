// const express = require('express')
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/user.route'
import GlobalHandler from './app/middlesWare/globalErrorHandler'
// import { createUser } from './app/modules/users/users.services'

const app: Application = express()
// const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application

app.use('/api/v1/users', userRouter)




app.get('/',  (req: Request, res: Response,next:NextFunction) => {
  //  const addUser = await createUser({id:"445",role:"admin",password:"asdfasdf"})

  // res.send(addUser)
  // throw new ApiError(400,"Error from app.ts")
  // throw new Error("Error from app.get")
  // next("next error")
  res.send({ status: true, data: 'Database connected ' })
  next()
})

app.use(GlobalHandler)

export default app
