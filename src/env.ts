import { Env } from './types';

const env: Env = {
  BOT_AUTH_TOKEN: process.env.BOT_AUTH_TOKEN as string,
  GREETING_MESSAGE: process.env.GREETING_MESSAGE as string,
  TELEGRAM_SUPPORT_CHAT_ID: process.env.TELEGRAM_SUPPORT_CHAT_ID as string,
  DOMAIN: process.env.DOMAIN as string,
  PORT: process.env.PORT as string, // heroku setup it
}

export default env;