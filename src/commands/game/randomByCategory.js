const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getpict-category')
    .setDescription('Select Category to Generate Anime Pict as You Choice')
    .addStringOption((option) => {
      return option.setName('category').setDescription('Select the category').setRequired(true).setAutocomplete(true);
    }),
  async autocomplete(interaction) {
    await fetch('https://api.nekosapi.com/v3/images/tags?is_nsfw=false&limit=25', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(async (data) => {
        let options = [];
        data.items.forEach((item) => {
          options.push({
            name: item.name,
            value: item.id.toString(),
          });
        });
        await interaction.respond(options);
      });
  },
  async execute(interaction) {
    // await fetch('https://api.nekosapi.com/v3/images/tags?is_nsfw=false&limit=25', {
    //   method: 'GET',
    // })
    //   .then((res) => res.json())
    //   .then(async (data) => {
    //     let options = [];
    //     data.items.forEach((item) => {
    //       options.push({
    //         label: item.name,
    //         description: item.description,
    //         value: item.id.toString(),
    //       });
    //     });
    //     const select = new StringSelectMenuBuilder().setCustomId('select').setPlaceholder('Select Category').addOptions(options);

    //     const row = new ActionRowBuilder().addComponents(select);
    //     const response = await interaction.reply({ content: 'Select your category', components: [row], ephemeral: true });

    //     const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

    //     collector.on(
    //       'collect',
    //       async (e) =>
    //         await interaction.editReply({
    //           content: `Selected`,
    //           components: [],
    //         })
    //     );
    //   });

    const values = interaction.options.getString('category');
    await fetch(`https://api.nekosapi.com/v3/images/random?limit=1&tag=${values}&rating=safe`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.items.length === 0) {
          await interaction.reply('Sorry, Image Not Found.');
          return;
        }
        image_url = data.items[0].sample_url;
        const exampleEmbed = new EmbedBuilder().setImage(image_url).setColor('#00BFFF');
        await interaction.reply({ embeds: [exampleEmbed], components: [], content: 'Here you go', ephemeral: false });
      });
  },
};
