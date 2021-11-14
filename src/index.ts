import { Bot } from 'grammy';
import env from './env';
import * as handlers from './handlers';
import commands from './commands';

const bot = new Bot(env.BOT_AUTH_TOKEN);

// React to commands
commands.forEach(({ commandName, handlerName }) => {
  try {
    const handler = handlers[handlerName];
    if (handler === undefined) throw new Error(`Handler for command '${commandName}' not exist`);
    bot.command(commandName, handler);
  } catch(e) {
    console.error(e);
  }
});

// Handle other messages
bot.on('message', (ctx) => ctx.reply('Got another message!'));

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.
bot.start();
