/// <reference path="./authSession.d.ts" />

import session from 'express-session'
import redis from '../../../../cache/redis'
import env from '../../../../env';
import connectRedis from "connect-redis"
const RedisStore = connectRedis(session);

const authSession = session({
  name: env.APP_ENV === "dev" ? "id" : `id_${env.APP_NAME?.replace(/^W/g, "")}`,
  secret: env.JWT_SECRET,
  resave: false, // Redis Store implements touch see https://github.com/expressjs/session#resave
  saveUninitialized: false, // Donot save session until modification see https://github.com/expressjs/session#saveuninitialized
  cookie: {
    maxAge: env.JWT_EXPIRES,
    secure: env.APP_ENV !== "dev"
  },
  store: new RedisStore({ client: redis , prefix: `sess_${env.APP_NAME}:`}),
})

export default authSession;