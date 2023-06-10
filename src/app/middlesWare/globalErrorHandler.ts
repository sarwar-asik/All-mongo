/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */

import { ErrorRequestHandler } from 'express'
import config from '../../../src/config.ts/index'
import { IGenericErrorMessage } from '../../interfaces/Ierror'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import configTs from '../../../src/config.ts/index'
import { errorLogger } from '../../shared/logger'



const GlobalHandler:ErrorRequestHandler = (error ,req, res,next) => {


  configTs.env === "development" ? console.log("globalErrorHandler",error):errorLogger.error("Error from globalError",error)

  let statusCode = 500
  let message = 'Something went wrong'

  let errorMessage: IGenericErrorMessage[] = []

  if (error?.name === 'ValidatorError') {
    const simplifiedMessage = handleValidationError(error)
    statusCode = simplifiedMessage?.statusCode
    message = simplifiedMessage?.message


  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message ? [{ path: '', message: message }] : []
  } else if (error instanceof Error) {
    message = error.message
    errorMessage = error?.message ? [{ path: '', message: error?.message }] : []
  }

 

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })

  next()
}



export default GlobalHandler
