/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const Guild = require("../../models/log"); //require our log model
const mongoose = require("mongoose");

module.exports = {
  name: "setlogchannel",
  run: async (client, message, args) => {
    message.delete();

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
      return message.channel
        .send({content: "You do not have permission to use this command."});

    const channel = message.mentions.channels.first();
    if (!channel)
      return message.reply({content:`Hey! you need to mention a channel!`});
    const guild1 = message.guild;
    let webhookid;
    let webhooktoken;
    await channel
      .createWebhook(guild1.name, {
        avatar: guild1.iconURL({ format: "png" }),
      })
      .then((webhook) => {
        webhookid = webhook.id;
        webhooktoken = webhook.token;
      });

    if (!channel)
      return message.channel
        .send({content:
          "I cannot find that channel. Please mention a channel within this server."
        }
        );

    await Guild.findOne(
      //will find data from database
      {
        guildID: message.guild.id,
      },
      async (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
          // what the bot should do if there is no data found for the server
          const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            logChannelID: channel.id,
            webhookid: webhookid,
            webhooktoken: webhooktoken,
          });

          await newGuild
            .save() 
            .then((result) => console.log(result))
            .catch((err) => console.error(err));

          return message.channel.send({content:
            `The log channel has been set to ${channel}`
          }
          );
        } else {
          guild
            .updateOne({
              //if data is found then update it with new one
              logChannelID: channel.id,
              webhooktoken: webhooktoken,
              webhookid: webhookid,
            })
            .catch((err) => console.error(err));

          return message.channel.send({content:
            `The log channel has been updated to ${channel}`
          }
          );
        }
      }
    );
  },
};
