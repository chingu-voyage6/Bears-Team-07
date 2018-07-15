
import * as express from 'express';
import Multer from 'multer';
import fs from 'fs-extra';
import puff from './puff';

const multerStorage = Multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(process.env.UPLOAD_DIRECTORY)) {
      fs.ensureDir(process.env.UPLOAD_DIRECTORY, function (error) {
        if (error) {
          console.error(error);
        }
      });
    }
    cb(null, process.env.UPLOAD_DIRECTORY);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const multerFilefilter = (req, file, cb) => {
  //reject file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerUpload = Multer({
  storage: multerStorage,
  limits: {
    fileSize: process.env.REQUEST_LIMIT,
  },
  fileFilter: multerFilefilter,
});

export default express
  .Router()
  .post('/', puff.create)
  .post('/u', multerUpload.single('upload'), puff.createWithFile)
  .put('/u/:id', multerUpload.single('upload'), puff.updateWithFile)
  .put('/:id', puff.update)
  .get('/', puff.list)
  .get('/:id', puff.get)
  .get('/user/:username', puff.getUserPuffs) // Samuel Line
  .delete('/:id', puff.remove);
