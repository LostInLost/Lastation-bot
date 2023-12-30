const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('check').setDescription('Check your Identity'),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('User Profile')
      .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction?.user?.id}/${interaction?.user?.avatar}?size=1024`)
      .addFields({ name: 'Username', value: interaction.user?.username })
      .setTimestamp();
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
