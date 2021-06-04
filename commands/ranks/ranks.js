const RankSchema = require('../../models/ranks')
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ranks',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
    RankSchema.find({ Guild: message.guild.id }, async(err, data) => {
        if(!data) return message.reply('There is no rank.');
        message.channel.send(
            new MessageEmbed()
            .setDescription(data.map(({ Rank, Role }, index) => {
            return `#${index + 1} | **${Rank}** ➡ <@&${Role}>`
        }).join('\n'))
        )
    })
  } catch (e) {
    return message.channel.send(`An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`)
  }
  },
};