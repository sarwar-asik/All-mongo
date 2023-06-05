// const express = require('express')
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from "./app/modules/users/user.route"
// import { createUser } from './app/modules/users/users.services'

const app: Application = express()
// const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Application 

app.use('/api/v1/users',userRouter)

app.get('/', async (req: Request, res: Response) => {
  //  const addUser = await createUser({id:"445",role:"admin",password:"asdfasdf"})

  // res.send(addUser)
  res.send({ status: true, data: 'Database connected ' })
})

export default app
