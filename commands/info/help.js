const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { semoji, femoji } = require('../../config.json')

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {

    const p = await client.prefix(message)
    const colr = '#2F3136';
    const roleColor =
    message.guild.me.displayHexColor === "#000000"
      ? "#ffffff"
      : message.guild.me.displayHexColor;

  if (!args[0]) {
      const AntiAlt = new MessageEmbed()
      .setTitle(`**<:moderatorblue:853672070156255232> __Anti Alt__**`)
      .addField(`Commands`, `disable-alt, enable-alt, setaltlogs`)
      .setFooter(`Page 1/29`)
      .setColor('#2F3136')

      const antilink = new MessageEmbed()
        .setTitle(`**🔗 __Anti Link__**`)
        .addField(`Commands`, `antilink-enable, antilink-disable`)
        .setFooter(`Page 2/29`)
        .setColor("#2F3136");

      const antiping = new MessageEmbed()
        .setTitle(`**<:oofPinged:855744196316626945> __Anti Ping__**`)
        .addField(`Commands`, `anti-ping`)
        .setFooter(`Page 3/29`)
        .setColor("#2F3136");

      const Antiswear = new MessageEmbed()
        .setTitle(`**<:angryanti:855745093759795201> __Anti Swear__**`)
        .addField(`Commands`, `blacklist-word`)
        .setFooter(`Page 4/29`)
        .setColor("#2F3136");

      const bio = new MessageEmbed()
        .setTitle(`**👨‍🔬 __Bio__**`)
        .addField(`Commands`, `bio, set-bio`)
        .setColor("#2F3136")
        .setFooter(`Page 5/29`);

      const birthhday = new MessageEmbed()
        .setTitle(`**🎂 __Birthday__**`)
        .addField(`Commands`, `set-birthday, check-birthday`)
        .setColor("#2F3136")
        .setFooter(`Page 6/29`);

      const bot = new MessageEmbed()
        .setTitle(`**🤖 __Bot__**`)
        .addField(
          `Commands`,
          `donate, feedback, report-bug, shard-stats, stats, uptime`
        )
        .setColor("#2F3136")
        .setFooter(`Page 7/29`);

        const ytposter = new MessageEmbed()
          .setTitle(
            `**<:logo_youtube:860559771102347295> __YouTube Notifications__**`
          )
          .addField(
            `Commands`,
            `
        set, latest-video, lastvideo, get, edit, delete, ytchannel-info
        `
          )
          .setColor("#2F3136")
          .setFooter(`Page 8/29`)

      const cc = new MessageEmbed()
        .setTitle(`**📁 __Custom Commands__**`)
        .addField(`Commands`, "cc-create, cc-delete, cc-list")
        .setColor("#2F3136")
        .setFooter(`Page 9/29`);

      const dt = new MessageEmbed()
      .setTitle(`**<a:Discord:840220429025856030> __Discord Together__**`)
      .addField(`Commands`, `betrayl-together, fishing-together, poker-together, youtube-together`)
      .setColor(colr)
      .setFooter(`Page 10/29`)

      const Economy = new MessageEmbed()
      .setTitle(`**💰 __Economy__**`)
      .addField(`Commands`, `bal, beg, buy, crime, daily, dep, give, shop, slots, use, with, work`)
      .setColor(colr)
      .setFooter(`Page 11/29`)

      const Fun = new MessageEmbed()
      .setTitle(`**🤣 __Fun__**`)
      .addField(`Commands`, `spin, 8ball, akinator, anime, binary, calculator, changemymind, chaos-words, clapify, clyde, color, comment, connect4, trash, emojify, facepalm, facts, fast-type, fight, gay-rate, hangman, hug, image, joke, magik, meme, mock, owoify, quote, gay, rip, hitler, roast, roblox, rockpaperscissors, say, ship, shit, simp-card, simp-rate, slap, snake, spotify, sudo, superscript-text, ascii, tictactoe, translate, trivia, tweet, useless-web, wanted, wasted, wouldyourather`)
      .setColor(colr)
      .setFooter(`Page 12/29`)

      const gw = new MessageEmbed()
        .setTitle(`**🎉 __Giveaway__**`)
        .addField(`Commands`, `gend, greroll, gstart`)
        .setColor(colr)
        .setFooter(`Page 13/29`);

      const info = new MessageEmbed()
        .setTitle(`**<:infoblue:855752307979583508> __Info__**`)
        .addField(
          `Commands`,
          `badges, djs, firstmessage, emojiinfo,help, position, members, oldest, permissions, ping, roles`
        )
        .setColor(colr)
        .setFooter(`Page 14/29`);

      const leveling = new MessageEmbed()
        .setTitle(`**📈 __Leveling__**`)
        .addField(
          `Commands`,
          `add-xp, disable-leveling, enable-leveling, leaderboard, level, reset-xp`
        )
        .setColor(colr)
        .setFooter(`Page 15/29`);

        const voiceLeveling = new MessageEmbed()
          .setTitle(`**<:voice:859827123757907998> __Voice Leveling__`)
          .addField(
            `Commands`,
            `toggle-voice-leveling, reset-voice-leveling, togglevoicemuted, togglebots, voice-leaderboard, voice-time`
          )
          .setColor(colr)
          .setFooter(`Page 16/29`)

      const mod = new MessageEmbed()
        .setTitle(`**⛏ __Moderation__**`)
        .addField(
          `Commands`,
          `anticaps-disable, antibot, antivc, ban, purge, remove-all-warns, hackban, kick, lock, lockdown, mod-nick, nick, nuke, reset, remove-warn, setup-anticaps, slowmode, unantivc, unban, unlock, warn, warns`
        )
        .setColor(colr)
        .setFooter(`Page 17/29`);

      const modlogs = new MessageEmbed()
        .setTitle(`**💳 __Mod Logs__**`)
        .addField(`Commands`, `setlogchannel`)
        .setColor(colr)
        .setFooter(`Page 18/29`);

      const music = new MessageEmbed()
        .setTitle(`**🎵 __Music__**`)
        .addField(
          `Commands`,
          `autoplay, filter, forward, loop, nowplaying, pause, play, queue, resume, rewind, seek, shuffle, skip, stop, volume`
        )
        .setColor(colr)
        .setFooter(`Page 19/29`);

      const mute = new MessageEmbed()
        .setTitle(`**🤐 __Mute__**`)
        .addField(`Commands`, `mute, tempmute, unmute`)
        .setColor(colr)
        .setFooter(`Page 20/29`);

      const prefix = new MessageEmbed()
        .setTitle(`**🖨 __Prefix__**`)
        .addField(`Commands`, `prefix, prefix-reset`)
        .setColor(colr)
        .setFooter(`Page 21/29`);

      const ranks = new MessageEmbed()
        .setTitle(`**🔘 __Ranks__**`)
        .addField(`Commands`, `addrank, delrank, rank, ranks`)
        .setFooter(`Page 22/29`)
        .setColor(colr);

      const reactionroels = new MessageEmbed()
        .setTitle(`**<:Hype_Role:821003023835987998> __Reaction Roles__**`)
        .addField(`Commands`, `rradd, rrremove`)
        .setColor(colr)
        .setFooter(`Page 23/29`);

      const starboard = new MessageEmbed()
        .setTitle(`**⭐ __Starboard__**`)
        .addField(
          `Commands`,
          `starboard-channel, starboard-disable, starboard-min`
        )
        .setColor(colr)
        .setFooter(`Page 24/29`);

      const suggestion = new MessageEmbed()
        .setTitle(`**✅ __Suggestions__**`)
        .addField(
          `Commands`,
          `accept-suggestion, deny-suggestion, setsuggest, suggest`
        )
        .setColor(colr)
        .setFooter(`Page 25/29`);

      const tickets = new MessageEmbed()
        .setTitle(`**🎫 __Tickets__**`)
        .addField(`Commands`, `ticket-setup`)
        .setColor(colr)
        .setFooter(`Page 26/29`);

      const uno = new MessageEmbed()
        .setTitle(`**<:uno:854962001695997992> __Uno__**`)
        .addField(
          `Commands`,
          `close-game, creategame, draw, end-game, join-game, leave-game, play-card, start-game, uno, view-cards, view-winners, view-table`
        )
        .setColor(colr)
        .setFooter(`Page 27/29`);

      const util = new MessageEmbed()
        .setTitle(`**⚙ __Utility__**`)
        .addField(
          `Commands`,
          `addrole, announce, autorole, autorole-check, autorole-remove, avatar, channel-info, create-channel, delete-channel, discriminator, embed, bans, invite, premium, pull-from-vc, reminder, removerole, serverinfo, steal, url-shorten, userinfo, worldclock`
        )
        .setColor(colr)
        .setFooter(`Page 28/29`);

      let welcomeLWESGO = new MessageEmbed()
        .setTitle(`**👋 __Welcome__**`)
        .addField(`Commands`, `welcome`)
        .setColor(colr)
        .setFooter(`Page 29/29`);

      let embedsarray = [AntiAlt, antilink, antiping, Antiswear, bio, birthhday, bot, ytposter, cc, dt, Economy, Fun, gw, info, leveling, voiceLeveling, mod, modlogs, music, mute, prefix, ranks, reactionroels, starboard, suggestion, tickets, uno, util, welcomeLWESGO]

      let emoji = ['⬅', '➡']

      message.channel.createSlider(message.author.id, embedsarray, emoji)
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