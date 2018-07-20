import * as express from 'express';
import Multer from 'multer';
import fs from 'fs-extra';
import puff from './puff';
import {
  validateToken,
} from '../../services/jwt';

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
  // reject file
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
  .post('/', validateToken, puff.create)
  .post('/u', validateToken, multerUpload.single('upload'), puff.createWithFile)
  .put('/u/:id', validateToken, multerUpload.single('upload'), puff.updateWithFile)
  .put('/:id', validateToken, puff.update)
  .get('/', validateToken, puff.list)
  .get('/:id', validateToken, puff.get)
  .delete('/:id', validateToken, puff.remove);
