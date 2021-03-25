const { Client, Message, MessageEmbed } = require("discord.js");
const math = require('mathjs')

module.exports = {
  name: 'solve',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
        message.channel.send(
            new MessageEmbed()
            .setTitle(`Problem Solved`)
            .addField(`Problem of the user`, args.join(" "))
            .addField('Solution', math.evaluate(args.join(" ")))
            .setColor('BLUE')
        )
    } catch (err) {
        message.channel.send('This question is not a math question.')
    }
  },
};