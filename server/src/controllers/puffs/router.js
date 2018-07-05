import * as express from 'express';
import puff from './puff';

export default express
  .Router()
  .post('/', puff.create)
  .put('/:id', puff.update)
  .get('/', puff.list)
  .get('/:id', puff.get)
  .delete('/:id', puff.remove);
