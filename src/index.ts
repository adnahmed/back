import { config } from "dotenv-flow";
config()
import http from 'http'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server';
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import env from "./env"
import schema from "./graphql/schema";
import validation_rules from "./graphql/validation_rules";
import cache from "./cache";
const app = express();
const server = http.createServer(app);
const port = normalizePort(env.PORT || 3000);
app.set('port', port);
if( env.APP_ENV !== "dev") app.enable("trust proxy"); // adjust for reverse proxy see: https://expressjs.com/en/guide/behind-proxies.html
app.disable("x-powered-by");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
interface MyContext {
  token?: String;
}
// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const graphql = new ApolloServer<MyContext>({
    schema: schema,
    csrfPrevention: true,
    introspection: true,
    cache: cache,
    validationRules: validation_rules,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginDrainHttpServer({ httpServer: server })
    ],
});
// Ensure we wait for our server to start
await graphql.start();

app.use(
  '/',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);


app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = env.APP_ENV === 'dev' ? err : {};
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