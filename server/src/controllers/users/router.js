import * as express from 'express';
import user from './user';
import {
  createUserSchema
} from '../../schemas';

export default express
  .Router()
  .post('/',
    createUserSchema,
    user.create)
  .put('/:id', user.update)
  .get('/', user.list)
  .get('/:id', user.get)
  .delete('/:id', user.remove);
