const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;

    const values = interaction.values[0];
    let image_url;
    await fetch(`https://api.nekosapi.com/v3/images/random?limit=1&tag=${values}&rating=safe`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.items.length === 0) {
          await interaction.update({ embeds: [], components: [], content: 'Sorry, Image Not Found.' });
          return;
        }
        image_url = data.items[0].sample_url;
        const exampleEmbed = new EmbedBuilder().setImage(image_url).setColor('#00BFFF');
        await interaction.reply({ embeds: [exampleEmbed], components: [], content: 'Here you go', ephemeral: false });
      });

    // if (!command) {
    //   console.error(`No command matching ${interaction.commandName} was found.`);
    //   return;
    // }

    // try {
    //   await command.execute(interaction);
    // } catch (error) {
    //   console.error(`Error executing ${interaction.commandName}`);
    //   console.error(error);
    // }
  },
};
