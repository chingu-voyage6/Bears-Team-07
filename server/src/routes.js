import authRouter from './controllers/auth/router';
import usersRouter from './controllers/users/router';

export default function routes(app) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', usersRouter);

  // Handling CORS by adding headers to the response
  // so that the browser on the client allows interaction
  // though both client and server are on different origins
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      res.status(200).json({});
    }
    next();
  });
}
