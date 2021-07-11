const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync, readdir } = require("fs");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {
    const prefix = await client.prefix(message);

    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      const letEmbed = new MessageEmbed()
        .setTitle(`Need help? Here are all of my commands!`)
        .setDescription(`React with the emoji's to move the pages!`)
        .setColor("DARK_BUT_NOT_BLACK");

      const AntiAlt = readdirSync("./commands/AntiAlt")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const Antilink = readdirSync("./commands/Antilink")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const antiping = readdirSync("./commands/antiping")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const antiswear = readdirSync("./commands/antiswear")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const Bio = readdirSync("./commands/Bio")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const birthday = readdirSync("./commands/birthday")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const Bot = readdirSync("./commands/Bot")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const customcommands = readdirSync("./commands/customcommands")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const DiscordTogeht = readdirSync("./commands/DiscordTogether")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const Economy = readdirSync("./commands/Economy")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const fun = readdirSync("./commands/fun")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const Giveaway = readdirSync("./commands/Giveaway")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      const info = readdirSync("./commands/info")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

        const Leveling = readdirSync('./commands/Leveling')
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""))

        const moderation = readdirSync("./commands/moderation")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.endsWith(".js", ""))

        const ModLogs = readdirSync("./commands/ModLogs")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const Music = readdirSync("./commands/Music")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const mute = readdirSync("./commands/mute")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const Prefix = readdirSync("./commands/Prefix")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const ranks = readdirSync("./commands/ranks")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const reactionroles = readdirSync("./commands/reactionroles")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const starBoard = readdirSync("./commands/Starboard")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const suggestions = readdirSync("./commands/Suggestions")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const Tickets = readdirSync("./commands/Tickets")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const Utility = readdirSync("./commands/Utility")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const VoiceLeveling = readdirSync("./commands/Voice Leveling")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

        const WelcmoeSetup = readdirSync("./commands/welcomesetup")
          .filter((file) => file.endsWith(".js"))
          .map((file) => file.endsWith(".js", ""));

          const ytnotifs = readdirSync("./commands/Youtube Notifications")
            .filter((file) => file.endsWith(".js"))
            .map((file) => file.endsWith(".js", ""));

            letEmbed.addField(`Anti Alt`, AntiAlt)
            letEmbed.addField(`Anti Link`, Antilink)
            letEmbed.addField(`Anti Ping`, antiping);
            letEmbed.addField(`Anti Swear`, antiswear);
            letEmbed.addField(`Bio`, Bio);
            letEmbed.addField(`Birthday`, birthday);
            letEmbed.addField(`Bot`, Bot);
            letEmbed.addField(`Custom Commands`, customcommands);
            letEmbed.addField(`Discord Together`, DiscordTogeht);
            letEmbed.addField(`Economy`, Economy);
            letEmbed.addField(`Fun`, fun);
            letEmbed.addField(`Giveaways`, Giveaway);
            letEmbed.addField(`Info`, info);
            letEmbed.addField(`Leveling`, Leveling);
            letEmbed.addField(`Moderation`, moderation);
            letEmbed.addField(`Mod Logs`, ModLogs);
            letEmbed.addField(`Music`, Music);
            letEmbed.addField(`Mute`, mute);
            letEmbed.addField(`Prefix`, Prefix);
            letEmbed.addField(`Ranks`, ranks);
            letEmbed.addField(`Reaction Roles`, reactionroles);
            letEmbed.addField(`Starboard`, starBoard);
            letEmbed.addField(`Suggestions`, suggestions);
            letEmbed.addField(`Tickets`, Tickets);
            letEmbed.addField(`Utility`, Utility);
            letEmbed.addField(`Voice Leveling`, VoiceLeveling);
            letEmbed.addField(`Welcome setup`, WelcmoeSetup);
            letEmbed.addField(`YouTube Notifications`, ytnotifs);

            message.channel.send({ embeds: [letEmbed] })

    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("FF0000");
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("Prefix:", `\`${prefix}\``)
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({ embeds: [embed] });
    }
  },
};
