import { config } from 'dotenv-flow'
config()
import env from "./env";
import { startStandaloneServer } from '@apollo/server/standalone';
import cookieParser from "cookie-parser";
import express from "express";
import http from 'http';
import createError from "http-errors";
import logger from "morgan";
import graphql from './graphql';
const app = express();
const server = http.createServer(app)
const port = normalizePort(env.PORT || 3000);
app.set("port", port);
if (env.APP_ENV !== "dev") app.enable("trust proxy"); // adjust for reverse proxy see: https://expressjs.com/en/guide/behind-proxies.html
app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

(async () => {
  const { url } = await startStandaloneServer(graphql, {
    context:  async ({ req }) => ({ token: req.headers.token }),
    listen: { port: env.GQL_PORT || 4000 }
  });
  console.log(`🚀 Graphql Server ready at ${url}`);
})()

server.listen(port);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = env.APP_ENV === "dev" ? err : {};
  res.status(err.status || 500);
  res.send("Error");
});

server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr?.port;
  console.log("Express Server Listening on " + bind);
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