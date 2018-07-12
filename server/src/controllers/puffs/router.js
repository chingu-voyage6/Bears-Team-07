
import * as express from 'express';
import Multer from 'multer';
import puff from './puff';
const multer_storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const multer_filefilter = (req, file, cb) => {
  //reject file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multer_upload = Multer({
  storage: multer_storage,
  limits: {
    fileSize: process.env.REQUEST_LIMIT
  },
  fileFilter: multer_filefilter
});

export default express
  .Router()
  .post('/', puff.create)
  .post('/upload/:id', multer_upload.single('image'), puff.uploadImage)
  .put('/:id', puff.update)
  .get('/', puff.list)
  .get('/:id', puff.get)
  .delete('/:id', puff.remove);
