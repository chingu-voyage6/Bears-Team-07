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

const root = path.normalize(`${__dirname}/../..`);
app.set('appPath', `${root}client`);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  type: function() {
    return true;
  }
}));
// Handling CORS by adding headers to the response
// so that the browser on the client allows interaction
// though both client and server are on different origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.status(200).json({});
  }
  next();
});
app.use(cookieParser(process.env.SESSION_SECRET));
routes(app);

mongoose.connect(
  dbUrl, {
    connectTimeoutMS: 1000,
  }
);

const welcome = p => () => log.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
http.createServer(app).listen(port, welcome(port));
