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
  } catch (e) {
    console.error(e);
  }
});

// Handle other messages
bot.on('message', async (ctx) => {
  const isMessageInBotChat = String(ctx.chat?.id) !== env.TELEGRAM_SUPPORT_CHAT_ID;
  const isMessageInSupportChat = String(ctx.chat?.id) === env.TELEGRAM_SUPPORT_CHAT_ID;
  const withHeader = (message: string) => `${ctx.from.first_name}:\n` + message;
  const withFooter = (message: string) => message + `\n\n---\n#ID${ctx.from.id}X`;
  const formatMessage = (message: string) => withHeader(withFooter(message));
  const extractUserId = (message: string) => {
    const matches = message.match(/#ID.+X/gm);
    if (matches === null) return null;
    return matches.pop()?.slice(3, -1) ?? null;
  };

  try {
    console.log('isMessageInSupportChat', isMessageInSupportChat);

    if (isMessageInBotChat) {
      // Telegram not allow to edit others messages
      // So how we can add text message in that case - create copy and then edit it
      const { message_id: messageCopyId } = await ctx.copyMessage(env.TELEGRAM_SUPPORT_CHAT_ID);
      /* Add id and name as hashtag */

      // Simple message
      if (ctx.message.text) {
        ctx.api.editMessageText(env.TELEGRAM_SUPPORT_CHAT_ID, messageCopyId, formatMessage(ctx.message.text));
      }

      // Message with attachment
      else if (ctx.message.caption) {
        ctx.api.editMessageText(env.TELEGRAM_SUPPORT_CHAT_ID, messageCopyId, formatMessage(ctx.message.caption));
      }
    } else if (isMessageInSupportChat) {
      // Read id from hash tag
      console.log('=>', ctx.message.reply_to_message?.text, ctx.message.text, ctx.message.caption);

      const userId = extractUserId(
        // ctx.message.entities?.filter
        (ctx.message.reply_to_message?.text || ctx.message.text || ctx.message.caption) ?? ''
      );
      console.log('???? ~ file: bot.ts ~ line 49 ~ bot.on ~ userId', userId);
      if (userId) {
        // Copy and send message to user with this id
        ctx.copyMessage(userId);
      }
    }
  } catch (e) {
    console.error(e);
  }
});

bot.start();
