import { config } from "dotenv-flow";
config()
import http from 'http'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import express from 'express'
import env from "./env"
import session from "./graphql/resolvers/User/auth/authSession"
const app = express();
const server = http.createServer(app);
const port = normalizePort(env.PORT || 3000);
app.set('port', port);
if( env.NODE_ENV !== "dev") app.enable("trust proxy"); // adjust for reverse proxy see: https://expressjs.com/en/guide/behind-proxies.html
app.disable("x-powered-by");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = env.NODE_ENV === 'dev' ? err : {};
  res.status(err.status || 500);
  res.send("Error")
});
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  console.log('Listening on ' + bind);
}
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}