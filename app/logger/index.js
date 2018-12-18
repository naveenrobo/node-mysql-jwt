const winston = require('winston');
const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'error.log'
    })
  ]
});

module.exports = {
  logTheError: ( error ) =>{
    logger.log('error', error);
  }
}