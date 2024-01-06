const { SlashCommandBuilder } = require('discord.js');
const { mal } = require('../../utils/axiosClient');
const { anime } = require('../../Builder/Embeds/anime');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getanime-search')
    .setDescription('Get Anime by search title')
    .addStringOption((option) => option.setName('query').setDescription('Search anime by title').setRequired(true).setAutocomplete(true)),
  async autocomplete(interaction) {
    const value = interaction.options.getString('query');
    await mal
      .get('anime', {
        params: {
          type: 'tv',
          sfw: true,
          limit: 25,
          q: value.toString(),
        },
      })
      .then(async (res) => {
        const listAnime = res.data;
        let options = [];
        listAnime.data.forEach((anime) => {
          options.push({
            name: anime.title,
            value: anime.mal_id.toString(),
          });
        });
        await interaction.respond(options);
      });
  },
  async execute(interaction) {
    const value = interaction.options.getString('query');

    await interaction.deferReply();

    await mal
      .get('anime/' + value)
      .then(async (res) => {

        const animeData = res.data;

        const animeEmbed = anime(animeData.data.title, animeData.data.url, animeData.data.images.jpg.image_url, animeData.data.type, animeData.data.score, animeData.data.episodes, animeData.data.status, animeData.data.duration);
        await interaction.editReply({ embeds: [animeEmbed] });
      });
  },
};
