import Pino from 'pino';

const logger = Pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
});

export default logger;
