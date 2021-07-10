/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "userinfo",
  aliases: ["whois", "who"],
  description: "Information about a user",
  usage: "[@user]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let durumm;
    let durum = user.presence.status;

    let userRoles = user.roles.cache
      .map((x) => x)
      .filter((z) => z.name !== "@everyone");

    if (userRoles.length > 100) {
      userRoles = "More than 100";
    }

    let safe = message.author.createdTimestamp;

    if (safe > 604800017) {
      safe = "`Not Suspicious` <:Online:863277900543033414>";
    } else {
      safe = "`Suspicious` <:AD_IconStatusDND:862184549949112340>";
    }

    if (durum === "online") durumm = `Online <:Online:863277900543033414> `;
    if (durum === "offline") durumm = `Offline <:Offline:863278308644225036> `;
    if (durum === "idle") durumm = `Idle <:Idle:863278184896528384>`;
    if (durum === "dnd")
      durumm = `Do not disturb <:discorddnd:757485967266545704>`;

    let nitroBadge = user.user.avatarURL({ dynamic: true });
    let flags = user.user.flags.toArray().join(``);

    if (!flags) {
      flags = "None";
    }

    flags = flags.replace(
      "HOUSE_BRAVERY",
      "• <:brave:863279903049515018>`HypeSquad Bravery`"
    );
    flags = flags.replace(
      "EARLY_SUPPORTER",
      "• <a:nitro:740923343548579890> `Early Supporter`"
    );
    flags = flags.replace(
      "VERIFIED_DEVELOPER",
      "• <:discordbotdev:757489652214267904> `Verified Bot Developer`"
    );
    flags = flags.replace(
      "EARLY_VERIFIED_DEVELOPER",
      "• <:discordbotdev:757489652214267904> `Verified Bot Developer`"
    );
    flags = flags.replace(
      "HOUSE_BRILLIANCE",
      "• <:Brilliance:863282670679097377> `HypeSquad Brilliance`"
    );
    flags = flags.replace(
      "HOUSE_BALANCE",
      "• <:brave:863279903049515018>`HypeSquad Balance`"
    );
    flags = flags.replace(
      "DISCORD_PARTNER",
      "• <:Partner:863279621323096074> `Partner`"
    );
    flags = flags.replace(
      "HYPESQUAD_EVENTS",
      "• <:hypesquad_events:863280181170274304>`Hypesquad Events`"
    );
    flags = flags.replace(
      "DISCORD_CLASSIC",
      "• <a:Classic:863280475463221250>`Discord Classic`"
    );

    if (nitroBadge.includes("gif")) {
      flags =
        flags +
        `
      • <:NitroBoost:863280744818278400>  \`Nitro\``;
    }

    let stat = user.presence.activities[0];
    let custom;

    if (user.presence.activities.some((r) => r.name === "Spotify")) {
      custom = "Listening to Spotify";
    } else if (stat && stat.name !== "Custom Status") {
      custom = stat.name;
    } else {
      custom = "None";
    }

    if (
      user.presence.activities.some((r) => r.name !== "Spotify") &&
      stat &&
      stat.state !== null
    ) {
      stat = stat.state;
    } else {
      stat = "None";
    }

    const embeddd = new MessageEmbed()
      .setColor(`DARK_BUT_NOT_BLACK`)
      .setAuthor(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setDescription(
        `__**User Info**__
      **•** \`ID:\` **${user.id}**
      **•** \`Profile:\` **${user}**
      **•** \`Bot:\` **${user.user.bot ? "Yes" : "No"}**
      **•** \`Created At:\` **${moment(user.user.createdAt).format(
    "MMMM Do YYYY, H:mm:ss a"
  )}**
      __**Member Info**__
      **•** \`Nickname:\` **${user.displayName ? user.displayName : "yok"} **
      **•** \`Joined At:\` **${moment(user.joinedAt).format(
    "MMMM Do YYYY, H:mm:ss a"
  )}**
      **•** \`Activity:\` **${custom}**
      __**Roles:**__
      ${userRoles}
      __**Badge Information**__
      ${flags} 
      
      __**Suspicious Check**__
      • ${safe}`
      )
      .setThumbnail(user.user.avatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [embeddd] });
  },
};
