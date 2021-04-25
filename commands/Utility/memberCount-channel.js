const { Client, Message, MessageEmbed } = require("discord.js");
const Schema = require('../../models/member-count')

module.exports = {
  name: 'member-count-channel',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return;

    Schema.findOne({ Guild: message.guild.id }, async(err,data) => {
        if(data) data.delete();

        const channel = await message.guild.channels.create(
            `Members: ${message.guild.memberCount}`,
            {
                type: 'voice',
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ["CONNECT"],
                    },
                ],
            }
            
            );

            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
                Member: message.guild.memberCount,
            }).save();
    });
  },
};