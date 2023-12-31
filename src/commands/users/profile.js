const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { prisma } = require('../../lib/ORMPrisma');

module.exports = {
  data: new SlashCommandBuilder().setName('myprofile').setDescription('Check your profile game'),
  async execute(interaction) {
    const userExists = await prisma.user.findFirst({
      where: {
        userId: interaction.user.id,
      },
      select: {
        username: true,
        level: {
          select: {
            level: true,
            xp: true,
            nextLevel: true,
          },
        },
      },
    });

    if (!userExists) await interaction.reply("Can't show your profile because you're not registered in this game, type `/create` to create your user profile");

    await prisma.$disconnect();
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('User Profile')
      .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction?.user?.id}/${interaction?.user?.avatar}?size=1024`)
      .addFields({ name: 'Username', value: userExists.username }, { name: 'Level', value: userExists.level.level.toString() }, { name: 'Progress', value: `${userExists.level.xp}/${userExists.level.nextLevel}` })
      .setTimestamp();
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
