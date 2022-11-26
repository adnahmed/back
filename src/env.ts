import { cleanEnv, num, str } from "envalid";
export default cleanEnv(process.env, {
  APP_NAME: str({ default: "kesan-diary-api" }),
  APP_ENV: str({ choices: ["local", "dev", "test", "prod"], default: process.env.NODE_ENV }),
  JWT_EXPIRES: num({ default: 60 * 60 * 24 * 14 /* 2 weeks */ }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_USERNAME: str({ default: 'default' }),
  REDIS_PASSWORD: str({ default: '' }),
  REDIS_MAX_CONNECTION_RETRY: num({ default: 10 }),
  REDIS_RECONNECT_TIME: num({ default: 3000 }),
  REDIS_HOST: str({ default: 'localhost'}),
  PORT: num({default: 3000}),
  GQL_PORT: num({default: 4000}),
  DATABASE_URL: str(),
  JWT_SECRET: str(),
});