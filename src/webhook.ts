import express from 'express';
import { webhookCallback } from 'grammy';
import { bot } from './bot';
import env from './env';

const domain = String(env.DOMAIN);
const secretPath = String(env.BOT_AUTH_TOKEN);
const app = express();

app.use(express.json());
app.use(`/${secretPath}`, webhookCallback(bot, 'express'));

app.listen(Number(env.PORT), async () => {
  await bot.api.setWebhook(`https://${domain}/${secretPath}`);
});
