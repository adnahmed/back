import { cleanEnv, num, str } from "envalid";
export default cleanEnv(process.env, {
  APP_NAME: str(),
  APP_ENV: str({ choices: ["local", "dev", "test", "prod"] }),
  JWT_SECRET: str(),
  JWT_EXPIRES: num({ default: 60 * 60 * 24 * 14 /* 2 weeks */ }),
  ...((process.env.NODE_ENV === "dev") && {
    LOCAL_DATABASE_URL: str(),
    REDIS_HOST: str(),
    REDIS_PORT: num(),
    REDIS_USERNAME: str(),
    REDIS_PASSWORD: str(),
    REDIS_DB: num(),
    REDIS_MAX_CONNECTION_RETRY: num(),
    REDIS_RECONNECT_TIME: num(),
    NODE_ENV: str()
  }),
  ...(!(process.env.NODE_ENV === "dev") && {
    DATABASE_URL: str(),
    PORT: num(),
  }),
});