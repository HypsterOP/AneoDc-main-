const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'report-bug',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const owner = client.users.cache.get('800331322089537538');

    const query = args.join(" ");
    if(!query) return message.reply('Please tell me a bug.')

    const reportEmbed = new MessageEmbed()
    .setTitle(`New BUG! <:Bug_Hunter_Gold:821786394635796530> `)
    .addField('Author', message.author.toString(), true)
    .addField('Guild', message.guild.name, true)
    .addField('Report', query)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setColor('BLUE')
    .setTimestamp();

    owner.send(reportEmbed)
    message.channel.send(
      new MessageEmbed()
      .setDescription('<a:tick_check:821925192166408233> Thanks For Reporting a bug!')
      .setColor('GREEN')
    )
  }
}