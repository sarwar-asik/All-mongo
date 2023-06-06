import mongoose from 'mongoose'
import config from './config.ts'
import 'colors'
import logger from './shared/logger'
import app from './app'

async function mainFUnction() {
  try {
    await mongoose.connect(config.data_url as string, {
      dbName: 'University-management',
    })

    logger.info('db Connected successfully ')

    app.listen(config.port, () => {
      logger.info(`server app listening on port ${config.port}`)
    })
  } catch (error) {
    // const  {name,message,stack}=error;
    logger.error('failed to connect '.red, error)
  }
}

// console.log(config.port,"url".green.bold);

mainFUnction()
