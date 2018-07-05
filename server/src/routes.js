import PinoLogger from 'express-pino-logger';
import CORS from 'cors';
import authRouter from './controllers/auth/router';
import usersRouter from './controllers/users/router';
import pino from './logger';

export default function routes(app) {
  app.use(CORS());
  app.use(PinoLogger({
    logger: pino
  }));
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', usersRouter);
}
