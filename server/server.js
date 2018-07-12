import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import './src/env';
import routes from './src/routes';
import log from './src/logger';

mongoose.Promise = global.Promise;

const dbUrl = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/deardiiary';
const port = process.env.PORT || 3000;
const app = new Express();

app.use('/uploads', Express.static('uploads'));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: process.env.REQUEST_LIMIT
}));
app.use(bodyParser.json({
  // force contentType sjson only.  remove to allow uploads too.
  /*type: function() {
    return true;
  },*/
  limit: process.env.REQUEST_LIMIT
}));
app.use(cookieParser(process.env.SESSION_SECRET));

routes(app);

mongoose.connect(
  dbUrl, {
    connectTimeoutMS: 1000,
  }
);

const welcome = p => () => log.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
http.createServer(app).listen(port, welcome(port));
