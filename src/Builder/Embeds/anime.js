const { EmbedBuilder } = require('discord.js');

module.exports.anime = (title, urlMal, image_url, anime_type, anime_score, anime_episodes, anime_status, anime_duration) => {
  const getStringValue = (string) => {
    const newString = string ?? '~';
    return '`' + newString + '`';
  };
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({
      name: 'Anime Details',
    })
    .setTitle(title)
    .setURL(urlMal)
    .setImage(image_url)
    .addFields({ name: 'Type', value: getStringValue(anime_type), inline: true }, { name: 'Score', value: getStringValue(anime_score), inline: true }, { name: 'Episodes', value: getStringValue(anime_episodes), inline: true })
    .addFields(
      { name: 'Status', value: getStringValue(anime_status), inline: true },
      {
        name: 'Duration',
        value: getStringValue(anime_duration),
        inline: true,
      },
      { name: '\u200B', value: '\u200B', inline: true }
    )
    .setTimestamp();

  return embed;
};
