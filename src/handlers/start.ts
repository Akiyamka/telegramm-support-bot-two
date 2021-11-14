import { Context } from 'grammy';
import commands from 'src/commands';
import env from 'src/env';

export function start(ctx: Context) {
  const commandsList = commands.map((command) => `/${command.commandName}: ${command.description}`).join('/n');
  ctx.reply([env.GREETING_MESSAGE, `Available commands:${commandsList}`].join('/n'));
}
