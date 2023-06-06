import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),

  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' ,level:"info"}),

  ],
})

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
)

export default logger
