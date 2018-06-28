import * as express from 'express';
import auth from './auth';

export default express.Router()
  .post('/login', auth.login);
