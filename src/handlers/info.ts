import { Context } from 'grammy';
import env from '../env';
import { Env } from '../types';

export function info(ctx: Context, config: Env) {
  ctx.reply(`Информация о контексте: ${String(ctx.chat?.id)}`);
}
