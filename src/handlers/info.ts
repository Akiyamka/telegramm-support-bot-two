import { Context } from 'grammy';
import { Env } from '../types';

export function info(ctx: Context, config: Env) {
  ctx.reply(`ID чата: ${String(ctx.chat?.id)}`);
}
