import { RequestHandler } from 'express'

import { User } from './user.model'
import { UserService } from './user.services'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const {user} = req.body
    // console.log('hitted', data)
    const result = await UserService.createUserServices(user)
    if (result) {
      res.status(200).send({
        success: true,
        message: 'successfully created',
        data: result,
      })
    }
  } catch (error) {
    // res.status(400).send({ status: 'had an error in createUser', error })
    next(error)
  }
}

const getUser: RequestHandler = async (req, res) => {
  try {
    const data = await User.find()
    res.send(data)
  } catch (error) {
    res
      .status(400)
      .send({ status: 'had an error in getUser Controller', error })
  }
}

export const userController = { createUser, getUser }
