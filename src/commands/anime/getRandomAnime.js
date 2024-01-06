const { SlashCommandBuilder } = require('discord.js');
const { mal } = require('../../utils/axiosClient');
const { anime } = require('../../Builder/Embeds/anime');

module.exports = {
  data: new SlashCommandBuilder().setName('getanime').setDescription('Get Anime random for you'),
  async execute(interaction) {
    await interaction.deferReply();
    await mal.get('random/anime').then(async (res) => {
      const animeData = res.data;
      const animeEmbed = anime(animeData.data.title, animeData.data.url, animeData.data.images.jpg.image_url, animeData.data.type, animeData.data.score, animeData.data.episodes, animeData.data.status, animeData.data.duration);
      await interaction.editReply({ embeds: [animeEmbed] });
    });
  },
};
