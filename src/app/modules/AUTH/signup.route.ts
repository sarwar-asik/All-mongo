import express from 'express';

import validateRequest from '../../middlesWare/validateUserRequest';
import { UserValidation } from '../users/user.validation';
import { createUserAuthController } from './signup.controller';


const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  createUserAuthController
)


export const AuthSignUPRouter = router;