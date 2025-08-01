import {
  Client,
  Collection,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface Event {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => void;
}

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}
