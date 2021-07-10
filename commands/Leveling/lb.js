const Levels = require("discord-xp");
/*eslint-disable*/
const { MessageEmbed } = require("discord.js");
const schema = require("../../models/level");

module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  description: "Checks leaderboard of the server",
  timeout: "2000",
  run: async (client, message, args) => {
    const data = await schema.findOne({ Guild: message.guild.id });
    if (!data) return message.channel.send({content: `Leveling System is not enabled`});
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1) return reply("No one is on leaderboard !");

    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    ); // We process the leaderboard.

    const lb = leaderboard.map(
      (e) =>
        `\`${e.position}\`. **${e.username}#${e.discriminator}** - Level: **${
          e.level
        }** - XP: **${e.xp.toLocaleString()}**`
    ); // We map the outputs.

    message.channel.send({embeds: [
      new MessageEmbed()
        .setTitle(`**${message.guild.name}'s Leaderboard**`)
        .setDescription(`${lb.join("\n\n")}`)
        .setColor("RANDOM")
    ]
  }
    );
  },
};
