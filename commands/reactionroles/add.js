const { Client, Message, Util } = require("discord.js");
const Schema = require("../../models/reaction-roles");

module.exports = {
  name: 'add-role',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return;
    const role = message.mentions.roles.first()

    let [, emoji] = args;
    if(!emoji) return message.reply('Please give me an emoji!');

    const parsedEmoji = Util.parseEmoji(emoji);

    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) {
        data.Roles[parsedEmoji.name] = [
            role.id,
            {
              id: parsedEmoji.id,
              raw: emoji
            }
        ]

        await Schema.findOneAndUpdate({ Guild: message.guild.id }, data);
      } else {
        new Schema({
          Guild: message.guild.id,
          Message: 0,
          Roles: {
            [parsedEmoji.name]: [
              role.id,
              {
                id: parsedEmoji.id,
                raw: emoji
              },
          ],
          },
        }).save();
      }
      message.channel.send('New Role has been added!')
    });
  },
};