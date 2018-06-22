import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  //.post('/login', controller.login)
  .post('/', controller.save)
  .post('/:id', controller.update)
  .post('/:id/upload', controller.uploadImage)
  .get('/:id/image', controller.getImageFile)
  .get('/', controller.findAll)
  .get('/:id', controller.findById);