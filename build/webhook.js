var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/webhook.ts
import express from "express";
import { webhookCallback } from "grammy";

// src/bot.ts
import { Bot } from "grammy";

// src/env.ts
var env = {
  BOT_AUTH_TOKEN: process.env.BOT_AUTH_TOKEN,
  GREETING_MESSAGE: process.env.GREETING_MESSAGE,
  TELEGRAM_SUPPORT_CHAT_ID: process.env.TELEGRAM_SUPPORT_CHAT_ID
};
var env_default = env;

// src/handlers/index.ts
var handlers_exports = {};
__export(handlers_exports, {
  start: () => start
});

// src/commands.ts
var commands = [
  {
    commandName: "start",
    handlerName: "start",
    description: "Show greetings message, and list of available commands"
  }
];
var commands_default = commands;

// src/handlers/start.ts
function start(ctx, config) {
  const commandsList = commands_default.map((command) => `/${command.commandName}: ${command.description}`).join("/n");
  ctx.reply([env_default.GREETING_MESSAGE, `Available commands:${commandsList}`].join("/n"));
  const sender = ctx.message?.from;
  ctx.api.sendMessage(config.TELEGRAM_SUPPORT_CHAT_ID, JSON.stringify(sender, null, 2));
}

// src/bot.ts
var bot = new Bot(env_default.BOT_AUTH_TOKEN);
commands_default.forEach(({ commandName, handlerName }) => {
  try {
    const handler = handlers_exports[handlerName];
    if (handler === void 0)
      throw new Error(`Handler for command '${commandName}' not exist`);
    bot.command(commandName, (ctx) => handler(ctx, env_default));
  } catch (e) {
    console.error(e);
  }
});
bot.on("message", (ctx) => ctx.reply("Got another message!"));
bot.start();

// src/webhook.ts
var domain = String(process.env.DOMAIN);
var secretPath = String(process.env.BOT_TOKEN);
var app = express();
app.use(express.json());
app.use(`/${secretPath}`, webhookCallback(bot, "express"));
app.listen(Number(process.env.PORT), async () => {
  await bot.api.setWebhook(`https://${domain}/${secretPath}`);
});
