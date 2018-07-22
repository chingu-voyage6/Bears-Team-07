import * as express from 'express';
import user from './user';
import {
  validateToken,
} from '../../services/jwt';
import {
  createUserSchema,
} from '../../schemas';

export default express
  .Router()
  .post('/', createUserSchema, user.create)
  .put('/:id', validateToken, user.update)
  .get('/', validateToken, user.list)
  .get('/:id', validateToken, user.get)
  .delete('/:id', validateToken, user.remove);
