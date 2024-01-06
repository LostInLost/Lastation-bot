const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
  data: new SlashCommandBuilder().setName('getpict').setDescription('Just Generate Random Pict Anime'),
  async execute(interaction) {
    let image_url;
    await fetch('https://api.nekosapi.com/v3/images/random?limit=1&rating=safe', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.items.length === 0) {
          await interaction.reply({ content: 'Something wrong!, Please try again', ephemeral: true });
          return;
        }
        image_url = data.items[0].sample_url;
      });

    const exampleEmbed = new EmbedBuilder().setImage(image_url).setColor('#00BFFF');

    await interaction.deferReply();
    await wait(1000);
    await interaction.editReply({ embeds: [exampleEmbed] });
  },
};
