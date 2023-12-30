const { SlashCommandBuilder } = require('discord.js');
const { prisma } = require('../../../lib/ORMPrisma');

module.exports = {
  data: new SlashCommandBuilder().setName('create').setDescription('Create your User to join this Game'),
  async execute(interaction) {

    async function main(id, username) {
     const findUser = await prisma.user.findFirst({
      where: {
        userId: id
      }
     })
     if (!findUser) {
      await prisma.user.create({
        data: {
          userId: id,
          username: username,
          level: {
            create: {
              level: 1
            }
          }
        }
      })
      await interaction.reply('Successfully Created')
     } else {
      await interaction.reply('Your user already registered in this game')
     }
    }

    main(interaction.user.id, interaction.user.username)
      .catch(async (e) => {
        await interaction.reply('Database Connection Failed')
        console.error(e);
        process.exit(1);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  },
};
