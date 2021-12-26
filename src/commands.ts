import type * as handlers from './handlers';

interface AvailableCommand {
  commandName: string;
  handlerName: keyof typeof handlers;
  description: string;
}

const commands: AvailableCommand[] = [
  {
    commandName: 'start',
    handlerName: 'start',
    description: 'Show greetings message, and list of available commands'
  },
  {
    commandName: 'info',
    handlerName: 'info',
    description: 'Show info about group where bot added'
  }
];

export default commands;