import authRouter from './controllers/auth/router';
import usersRouter from './controllers/users/router';
import { CORS } = from './utils/util';

export default function routes(app) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', usersRouter);
  app.use(CORS);
}
