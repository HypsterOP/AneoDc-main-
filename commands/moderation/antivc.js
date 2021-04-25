const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'antivc',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_ROLES')) return;
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.reply('Please tell me the member who should be prevented from joining the vc');

    let role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
    if(!role) {
        try {
            message.channel.send('antivc role not found! Attempting to create one!');
            role = await message.guild.roles.create({
                data: {
                    name: 'antivc',
                    permissions: []
                }
            })

            message.guild.channels.cache.filter((c) => c.type === 'voice')
            .forEach(async (channel) => {
                await channel.createOverwrite(role, {
                    VIEW_CHANNEL: true,
                    CONNECT: false
                })
            })

            message.channel.send('Role Has been Created!')
        } catch (error) {
            console.log(error)
        }
    }
    await target.roles.add(role.id);
    message.channel.send(`${target} will now be prevented from joining vc\'s`)
  }
}