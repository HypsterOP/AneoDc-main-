/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "bans",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return;

    const fetchBans = message.guild.bans.fetch();
    const bannedMembers = (await fetchBans)
      .map((member) => `\`${member.user.tag}\``)
      .join("\n");

    message.channel.send({embeds: [
      new MessageEmbed()
        .setTitle(`List of banned users!`)
        .setDescription(bannedMembers || "No users banned yet.")
        .setColor("RANDOM")
    ]
    }
    );
  },
};
