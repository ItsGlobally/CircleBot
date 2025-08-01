import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commands: any[] = [];

const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = (await import(filePath)).default;

  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[WARNING] Skipping "${file}" — missing "data" or "execute".`);
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

try {
  console.log(`🔄 Refreshing ${commands.length} application (/) commands...`);

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID!),
    { body: commands }
  );

  console.log('✅ Successfully reloaded application (/) commands.');
} catch (error) {
  console.error('❌ Failed to reload commands:', error);
}
