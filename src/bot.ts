import { Bot } from 'grammy';
import env from './env';
import * as handlers from './handlers';
import commands from './commands';

export const bot = new Bot(env.BOT_AUTH_TOKEN);

// React to commands
commands.forEach(({ commandName, handlerName }) => {
  try {
    const handler = handlers[handlerName];
    if (handler === undefined) throw new Error(`Handler for command '${commandName}' not exist`);
    bot.command(commandName, (ctx) => handler(ctx, env));
  } catch(e) {
    console.error(e);
  }
});

// Handle other messages
bot.on('message', async (ctx) => {
  const isMessageInBotChat = String(ctx.chat?.id) === env.TELEGRAM_SUPPORT_CHAT_ID;
  if (isMessageInBotChat) {
    // Telegram not allow to edit others messages
    // So how we can add text message in that case - create copy and then edit it
    const { message_id: messageCopyId } = await ctx.copyMessage(env.TELEGRAM_SUPPORT_CHAT_ID);

    /* Add id and name as hashtag */

    // Simple message
    if (ctx.message.text) {
      ctx.api.editMessageText(env.TELEGRAM_SUPPORT_CHAT_ID, messageCopyId, `${ctx.message.text} \n #${ctx.senderChat?.id}`)
    }

    // Message with attachment
    else if (ctx.message.caption) {
      ctx.api.editMessageText(env.TELEGRAM_SUPPORT_CHAT_ID, messageCopyId, `${ctx.message.caption} \n #${ctx.senderChat?.id}`)
    }
    
  } 

  // else if (isMessageInSupportChat) {
  //   // Read id from hash tag
  //   // Copy and send message to user with this id
  // }
});

bot.start();
