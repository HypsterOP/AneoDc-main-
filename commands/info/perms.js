/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const permissions = require("../../utils/permissions.json");
module.exports = {
  name: "permissions",
  aliases: ["perms"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
      return message.reply({content:
        `Hey! Sorry but u need **Manage Roles** permission to do that!`
      }
      );
    function getChannelFromMention(message, mention) {
      if (!mention) return;
      const matches = mention.match(/^<#(\d+)>$/);
      if (!matches) return;
      const id = matches[1];
      return message.guild.channels.cache.get(id);
    }
    const member =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    const memberPermissions = member.permissions.toArray();
    const finalPermissions = [];
    for (const permission in permissions) {
      if (memberPermissions.includes(permission))
        finalPermissions.push(`+ ${permissions[permission]}`);
      else finalPermissions.push(`- ${permissions[permission]}`);
    }

    const embed = new MessageEmbed()
      .setTitle(`${member.displayName}'s Permissions`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`\`\`\`diff\n${finalPermissions.join("\n")}\`\`\``)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("#2F3136")
      .setTimestamp();
    message.channel.send({embeds: [embed]});
  },
};
