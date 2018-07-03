import authRouter from './controllers/auth/router';
import usersRouter from './controllers/users/router';
import PinoLogger from 'express-pino-logger';
import pino from './logger';
import {
  CORS
} from './utils';

export default function routes(app) {
  app.use(CORS);
  app.use(PinoLogger({
    logger: pino
  }));
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', usersRouter);
}
