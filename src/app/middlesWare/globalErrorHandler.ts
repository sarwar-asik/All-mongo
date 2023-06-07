import { NextFunction, Request, Response } from 'express'
import config from '../../../src/config.ts/index'
import { IGenericErrorMessage } from '../../interfaces/Ierror'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'

const GlobalHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'

  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'ValidatorError') {
    const simplyfiendError = handleValidationError(err)
    statusCode = simplyfiendError?.statusCode
    message = simplyfiendError?.message
  } 
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    errorMessage = error?.message;
    errorMessage=error?.message ? [{ path: '', message: message }] : []
  }
   else if (err instanceof Error) {
    message = err.message
    errorMessage = err?.message ? [{ path: '', message: errorr?.message }] : []
  }

  // const statusCode = 500
  // const message = 'something went wrong'
  // const errorMessage: IGenericErrorMessage[] = []

  // //   res.status(400).json({
  // //     success:false,
  // //     error:err

  // // })
  
    res.status(statusCode).json({
      success: false,
      message,
      errorMessage,
      stack: config.env !== 'production' ? err?.stack : undefined,
    })

  // next()
}

export default GlobalHandler
