const RankSchema = require('../../models/ranks')
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'delrank',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    const rankName = args.join(" ")
    if(!rankName) return message.reply('Please tell me a rank')
    RankSchema.findOne(
        { Guild: message.guild.id, Rank: rankName },
         async(err, data) => {
        if(data) {
            await RankSchema.findOneAndDelete({ Guild: message.guild.id, Rank: rankName })
            message.channel.send('The rank has been deleted.')
        }
        else return message.channel.send('There insn\'t any rank found for this guild!')
    }
    );
  },
};