import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { createUserAuthServices } from "./signup.services";
import sendResponse from "../../../shared/sendResponce";

export const createUserAuthController = catchAsync(async (req: Request, res: Response) => {
    const {...user} = req.body;
    // console.log(user, 'from controller=================');
    
    const result = await createUserAuthServices(user)
    if (result) {
      sendResponse(res, {
        success: true,
        message: 'successfully create User',
        statusCode: 200,
        data: result,
      });
      // next()
    }
  });