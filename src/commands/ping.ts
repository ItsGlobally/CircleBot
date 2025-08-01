import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types.ts';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: { reply: (arg0: string) => any; }) {
    await interaction.reply('Pong!');
  }
};

export default command;
