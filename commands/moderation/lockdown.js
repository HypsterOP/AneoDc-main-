const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'lockdown',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    const role = message.guild.roles.everyone;

    if(!args.length) return message.reply('Please tell me a query if false or true')

    const query = args[0].toLowerCase()

    if(!['true', 'false'].includes(query)) 
        return message.reply('The option that you have sent is not valid please say false or true.')

        const perms = role.permissions.toArray();
    if(query === 'false') {
        perms.push('SEND_MESSAGES')

        await role.edit({ permissions: perms })
        message.reply('`@everyone` role will now be able to send messages.');
    } else {
        const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');

        await role.edit({ permissions: newPerms })

        message.reply('`@everyone` role will now not be able to send messages!')
    }
  }
}