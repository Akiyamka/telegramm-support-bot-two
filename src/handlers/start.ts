import { Context } from 'grammy';
import commands from '../commands';
import env from '../env';
import { Env } from '../types';

export function start(ctx: Context, config: Env) {
  const commandsList = commands.map((command) => `/${command.commandName}: ${command.description}`).join('/n');
  ctx.reply([env.GREETING_MESSAGE, `Available commands:${commandsList}`].join('/n'));
  const sender = ctx.message?.from;
  ctx.api.sendMessage(config.TELEGRAM_SUPPORT_CHAT_ID, JSON.stringify(sender, null, 2));
}
