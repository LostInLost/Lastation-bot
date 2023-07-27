const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder().setName('big').setDescription('Replies with Bang!'),
  async execute(interaction) {
    await interaction.reply('Bang!')
    await wait(2000)
    await interaction.editReply('Hahahaha!');
  },
};
