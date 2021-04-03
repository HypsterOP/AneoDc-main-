const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'feedback',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const owner = client.users.cache.get('800331322089537538');

    const query = args.join(" ");
    if(!query) return message.reply('Please tell me the feedback')

    const reportEmbed = new MessageEmbed()
    .setTitle(`New Feedback!`)
    .addField('Author', message.author.toString(), true)
    .addField('Guild', message.guild.name, true)
    .addField('Feedback Messages', query)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setColor('BLUE')
    .setTimestamp();

    owner.send(reportEmbed)
    message.channel.send(
      new MessageEmbed()
      .setDescription('<a:tick_check:821925192166408233> Thanks For the feedback!}')
      .setColor('GREEN')
    )
  }
}