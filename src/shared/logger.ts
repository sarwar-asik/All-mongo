import winston from 'winston'
import path from 'path'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
)

export { logger, errorLogger }
