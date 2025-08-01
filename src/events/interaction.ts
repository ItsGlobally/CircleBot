import { Interaction } from 'discord.js';
import { Event } from '../types.ts';

const event: Event = {
  name: 'interactionCreate',
  async execute(interaction: { isChatInputCommand: () => any; commandName: any; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }, client: { commands: { get: (arg0: any) => any; }; }) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error executing that command!', ephemeral: true });
    }
  }
};

export default event;