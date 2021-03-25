const { Client, Message, MessageEmbed } = require("discord.js");
const { inspect } = require('util')

module.exports = {
  name: 'eval',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(message.author.id !== '800331322089537538') return message.channel.send('Bot Owner-Only Command.')

    const code = args.join(" ")
    if(!code) return message.reply('Hypster, tell me the code to evaluate');

    try {
        const result = await eval(code);
        let output = result;
        if(typeof result !== 'string') {
            output = inspect(result)
        }

        message.channel.send(output, { code: 'js' })
    } catch (error) {
        console.log(error);
        message.channel.send('Too long i guess hypster!')
    }
  }
}
