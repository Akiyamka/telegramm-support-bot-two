import { Context } from 'grammy';
import commands from '../commands';
import env from '../env';
import { Env } from '../types';

export function start(ctx: Context, config: Env) {
  const commandsList = commands.map((command) => `/${command.commandName} - ${command.description}`).join('\n');
  ctx.reply([env.GREETING_MESSAGE, `Доступные команды: \n${commandsList}`].join('\n'));
  const sender = ctx.message?.from;
  if (sender) {
    const senderType = sender.is_bot ? 'Бот' : 'Пользователь';
    const senderName = `${sender.username} ${sender.first_name} ${sender.last_name}`;
    ctx.api.sendMessage(
      config.TELEGRAM_SUPPORT_CHAT_ID,
      `${senderType} ${senderName} присоединился к чату \nid: ${sender.id}`
    );
  } else {
    ctx.api.sendMessage(
      config.TELEGRAM_SUPPORT_CHAT_ID,
      `Кто-то неизвестный присоединился к чату`
    );
  }
}
