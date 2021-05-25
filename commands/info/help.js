const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { semoji, femoji } = require('../../config.json')

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {

    const p = await client.prefix(message)
    const roleColor =
    message.guild.me.displayHexColor === "#000000"
      ? "#ffffff"
      : message.guild.me.displayHexColor;

  if (!args[0]) {
    let categories = [];

    const diremojis = {
      AntiAlt: "🧱",
      antilink : "🔗",
      antiswear: "🎯",
      Bio: "👩‍🔬",
      Audio: "🎶",
      birthday :"🎂",
      Bot :"🤖",
      Chat: "🧤",
      customcommands: "🗄",
      DiscordTogether: "<a:Discord:840220428025856030>",
      Economy: "💰",
      fun: "🤣",
      Giveaway: "🎉",
      info: "ℹ",
      ModLogs: "💹",
      moderation: "⛏",
      Music: "🎵",
      mute: "🤐",
      Prefix: "📑",
      ranks: "🔰",
      reactionroles: "🎭",
      Suggestions: "✅",
      Utility: "⚙",
      welcomesetup: "🙌"


    }
    const ignored = ["Owner-Only", "Shooting-Game", "Tickets"]
    readdirSync("./commands/").forEach((dir) => {
      const editedName = `${diremojis[dir]}  ${dir.toUpperCase()}`
      if(ignored.includes(dir)) return;
      const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const cmds = commands.filter((command) => {
        let file = require(`../../commands/${dir}/${command}`);

        return !file.hidden;
      }).map((command) => {
        let file = require(`../../commands/${dir}/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");

        return `\`${name}\``;
      });

      let data = new Object();

      data = {
        name: editedName,
        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
      };

      categories.push(data);
    });

    const embed = new MessageEmbed()
      .setTitle("📬 Need help? Here are all of my commands:")
      .addFields(categories)
      .setDescription(
        `Use \`${p}help\` followed by a command name to get more additional information on a command. For example: \`${p}help ban\`.`
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(roleColor);
    return message.channel.send(embed);
  } else {
    const command =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.find(
        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      );

    if (!command) {
      const embed = new MessageEmbed()
        .setTitle(`Command not found! Use \`${p}help\` for all of my commands!`)
        .setColor("FF0000");
      return message.channel.send(embed);
    }

    const embed = new MessageEmbed()
      .setTitle("Command Details:")
      .addField("Prefix:", `\`${p}\``)
      .addField(
        "Command Name:",
        command.name ? `\`${command.name}\`` : `${femoji}`
      )
      .addField(
        "Alaises:",
        command.aliases
          ? `\`${command.aliases.join("` `")}\``
          : `${femoji} No aliases`
      )
      .addField(
        "Usage:",
        command.usage
          ? `\`${p}${command.name} ${command.usage}\``
          : `\`${p}${command.name}\``
      )
      .addField(
        "Description:",
        command.description
          ? command.description
          : `${femoji} No Description`
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(roleColor);
    return message.channel.send(embed);
  }
},
};