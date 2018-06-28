import * as express from 'express';
import user from './user';

export default express
  .Router()
  .post('/', user.create)
  .put('/:id', user.update)
  //.post('/:id/upload', user.uploadImage)
  //.get('/:id/image', user.getImageFile)
  .get('/', user.list)
  .get('/:id', user.get)
  .delete('/:id', user.remove);