/* eslint-disable no-console */
import {  Request, Response } from 'express';

import { User } from './user.model';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  // console.log(user, 'from controller=================');
  // console.log('hitted', data);
  const result = await UserService.createUserServices(user);
  if (result) {
    sendResponse(res, {
      success: true,
      message: 'successfully create semester',
      statusCode: 200,
      data: result,
    });
    // next()
  }
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const data = await User.find();
  sendResponse(res, {
    success: true,
    message: 'successfully create semester',
    statusCode: 200,
    data: data,
  });
});

export const userController = { createUser, getUser };
