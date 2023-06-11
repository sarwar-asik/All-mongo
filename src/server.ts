/* eslint-disable no-console */
import mongoose from 'mongoose'
import config from './config.ts'
import 'colors'
import { logger, errorLogger } from './shared/logger'
import app from './app'
import { Server } from 'http'

process.on('uncaughtException', err => {
  errorLogger.error('UnCaught rejection is detected from serve.ts', err)
  process.exit(1)
})

let server: Server

async function mainFUnction() {
  try {
    await mongoose.connect(config.data_url as string, {
      dbName: 'University-management',
    })

    logger.info('db Connected successfully '.green.underline.bold)

    server = app.listen(config.port, () => {
      logger.info(`server app listening on port ${config.port}`.green.bold)
    })
  } catch (error) {
    // const  {name,message,stack}=error;
    errorLogger.error('failed to connect '.red.underline, error)
  }

  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    console.log(
      'UnHandle rejection is detected and closing the main() in serve.ts'
    )
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received ')
  if (server) {
    server.close()
  }
})

// console.log(config.port,"url".green.bold);

mainFUnction()
