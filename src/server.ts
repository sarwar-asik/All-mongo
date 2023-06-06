import mongoose from 'mongoose'
import config from './config.ts'
import 'colors'
import { logger, errorLogger } from './shared/logger'
import app from './app'

async function mainFUnction() {
  try {
    await mongoose.connect(config.data_url as string, {
      dbName: 'University-management',
    })

    logger.info('db Connected successfully '.green.underline.bold)

    app.listen(config.port, () => {
      logger.info(`server app listening on port ${config.port}`.green.bold)
    })
  } catch (error) {
    // const  {name,message,stack}=error;
    errorLogger.error('failed to connect '.red.underline, error)
  }
}

// console.log(config.port,"url".green.bold);

mainFUnction()
