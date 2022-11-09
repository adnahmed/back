import { cleanEnv, num, str } from "envalid";
export default cleanEnv(process.env, {
  APP_NAME: str({default: "kesan-diary-api"}),
  APP_ENV: str({ choices: ["local", "dev", "test", "prod"] }),
  JWT_SECRET: str(),
  JWT_EXPIRES: num({ default: 60 * 60 * 24 * 14 /* 2 weeks */ }),
  NODE_ENV: str({default: "dev"}),
  ...((process.env.APP_ENV === "dev") && {
    LOCAL_DATABASE_URL: str(),
    REDIS_HOST: str(),
    REDIS_PORT: num({default: 6379}),
    REDIS_USERNAME: str({default: 'default'}),
    REDIS_PASSWORD: str({default: ''}),
    REDIS_MAX_CONNECTION_RETRY: num({default: 10}),
    REDIS_RECONNECT_TIME: num({default: 3000}),
    PORT: num(),
  }),
  ...(!(process.env.APP_ENV === "dev") && {
    DATABASE_URL: str(),
  }),
});