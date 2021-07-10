/* eslint-disable no-unused-vars */
const { MessageEmbed, Permissions, Client, Message } = require("discord.js");
const schema = require("../../models/reaction-roles");

module.exports = {
  name: "rradd",
  description: "Adds a reaction roles",
  timeout: "1000",
  aliases: ["addrr"],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns 
   */
  run: async (client, message, args) => {
    try {
      const p = await client.prefix(message);
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
        return message.channel.send({content: `You can't use this command`});
      const channel =
        (await message.mentions.channels.first()) ||
        message.guild.channels.cache.get(args[0]);
      const msg1 = args[1];
      const role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[2]);
      let emoji = args[3];
      if (!channel)
        return message.channel.send({content:
          `Inccorect Usage! correct usage ${p}rradd <channel> <messageid> <role> <emoji>`
        }
        );
      if (!msg1)
        return message.channel.send({content:
          `Inccorect Usage! correct usage ${p}rradd <channel> <messageid> <role> <emoji>`
        }
        );
      if (!role)
        return message.channel.send({content:
          `Inccorect Usage! correct usage ${p}rradd <channel> <messageid> <role> <emoji>`
        }
        );
      if (!emoji)
        return message.channel.send({content:
          `Inccorect Usage! correct usage ${p}rradd <channel> <messageid> <role> <emoji>`
        }
        );
      try {
        let msg = await channel.messages.fetch(msg1);
      } catch (err) {
        return message.channel.send(
          `I cannot find Message ID \`${msg1}\` in ${channel}`
        );
      }
      let msg = await channel.messages.fetch(msg1);
      schema.findOne(
        {
          Guild: message.guild.id,
          Channel: channel.id,
          Message: msg.id,
          Emoji: emoji,
        },
        async (err, data) => {
          if (data)
            return message.channel.send({content: `This Reaction Role already exist`});
          try {
            await msg.react(emoji);
          } catch (err) {
            return message.channel.send({content: `Please provide valid emoji`});
          }
          new schema({
            Guild: message.guild.id,
            Channel: channel.id,
            Message: msg.id,
            Emoji: emoji,
            Role: role.id,
          }).save();
          message.channel.send({embeds:[
            new MessageEmbed()
              .setTitle(`Reaction Roles Added`)
              .addField(`Role`, role, true)
              .addField(`Channel`, channel, true)
              .addField(`Message`, msg.id, true)
              .addField(`Emoji`, emoji, true)
              .setColor("GREEN")
              .setTimestamp()
              .addField(
                `Link`,
                `[Jump](https://discord.com/channels/${message.guild.id}/${channel.id}/${msg.id})`
              )
          ]
          }
          );
        }
      );
    } catch (e) {
      return message.channel.send({content:
        `An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`
      }
      );
    }
  },
};
