import * as express from 'express';
import puff from './puff';

export default express
    .Router()
    .post('/', puff.create)
    .put('/:id', puff.update)
    .get('/', puff.list)
    .get('/:id', puff.get)
    .get('/user/:username', puff.getUserPuffs)
    .delete('/:id', puff.remove);
