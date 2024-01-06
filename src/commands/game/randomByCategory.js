const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ComponentType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('getpict-category').setDescription('Select Category to Generate Anime Pict as You Choice'),
  async execute(interaction) {
    await fetch('https://api.nekosapi.com/v3/images/tags?is_nsfw=false&limit=25', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(async (data) => {
        let options = [];
        data.items.forEach((item) => {
          options.push({
            label: item.name,
            description: item.description,
            value: item.id.toString(),
          });
        });
        const select = new StringSelectMenuBuilder().setCustomId('select').setPlaceholder('Select Category').addOptions(options);

        const row = new ActionRowBuilder().addComponents(select);
        const response = await interaction.reply({ content: 'Select your category', components: [row], ephemeral: true });

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

        collector.on(
          'collect',
          async (e) =>
            await interaction.editReply({
              content: `Selected`,
              components: [],
            })
        );
      });
  },
};
