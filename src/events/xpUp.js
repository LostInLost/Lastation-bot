const { Events } = require('discord.js');
const { prisma } = require('../lib/ORMPrisma');

module.exports = {
  name: Events.MessageCreate,
  async execute(interaction) {
    if (interaction.author.bot) return;
    let user = null;
    let dataLevel;
    const checkUser = await prisma.level.findFirst({
      where: {
        user: {
          userId: interaction.author.id,
        },
      },
      select: {
        level: true,
        nextLevel: true,
        xp: true,
      },
    });

    if (!checkUser)
      user = await prisma.user.create({
        data: {
          userId: interaction.author.id,
          username: interaction.author.username,
          level: {
            create: {
              level: 1,
            },
          },
        },
      });

    dataLevel = {
      xp: checkUser?.xp ?? 0,
      level: checkUser?.level ?? 1,
      nextLevel: checkUser?.nextLevel ?? 100,
    };

    const xpUp = dataLevel.xp + (20 * dataLevel.level);
    if (dataLevel.nextLevel <= xpUp) {
      const oldLevel = dataLevel.nextLevel;
      dataLevel.level += 1;
      dataLevel.nextLevel = oldLevel * dataLevel.level;
      dataLevel.xp = xpUp - oldLevel;
      await interaction.reply(`Level Up! you reached level ${dataLevel.level}`);
    }

    dataLevel.xp = xpUp;

    await prisma.user.update({
      where: {
        userId: user?.userId ?? interaction.author.id,
      },
      data: {
        level: {
          update: {
            data: dataLevel,
          },
        },
      },
    });

    await prisma.$disconnect();
  },
};
