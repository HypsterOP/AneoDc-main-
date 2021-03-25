const RankSchema = require('../../models/ranks')
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'rank',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
      const rankName = args.join(" ");
      if(!rankName) return message.channel.send('Please tell me a rank name!');
    RankSchema.findOne({ Guild: message.guild.id, Rank: rankName }, async(err, data) => {
        if(!data) return message.channel.send('That rank doesn\'t exist');
        message.member.roles.add(data.Role);
        return message.channel.send(`You have received <@&${data.Role}>`)
    });
  },
};