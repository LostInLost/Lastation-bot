const { Events, ClientPresence, Client, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    const serverCount = await client.guilds.cache.size;
    await client.user.setActivity(` in ${serverCount} Servers`, {
      type: ActivityType.Watching
    })

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
