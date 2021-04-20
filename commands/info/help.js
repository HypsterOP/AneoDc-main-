const pagination = require(`discord.js-pagination`);
const Discord = require('discord.js');
module.exports = {
  name: "help",
  description: "Shows all the commands",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

  run: async(client, message, args) => {
        const firstpage = new Discord.MessageEmbed()
        .setTitle(`Help page | Aneo`)
        .addField(`<:member:833699997446570005> | General Commands`, `Commands for everyone`)
        .addField(`<a:admin_ban:833699001093062696> | Administrator Commands`, `Commands for admins`)
        .addField(`<:aneocoin:828621697174208532> | Economy`, `Economy Commands<:aneocoin:828621697174208532> | Economy`, `Economy Commands`)
        .addField(`🎵 | Music`, `Music Commands`)
        .addField(`<:lol:833521440711901214> | Fun Commands`, `Fun commands to use`)
        .addField(`ℹ | Info Commands`, `info commands`)
        .addField(`🎭 | Reaction Roles`, `Reaction Roles for the server`)
        .addField(`👑 | Ranks`, `Rank commands`)
        .addField(`♾ | Utility | Utility Commands`, `Utility Commands!`)
        .setColor('BLUE')

        const GeneralCommands = new Discord.MessageEmbed()
        .setTitle(`<:member:833699997446570005> | General Commands`)
        .addField(`:cake: Birthday Commands`, `set-birthday, check-birthday`)
        .addField(`:robot: Bot Commands`, `donate, feedback, report-bug, stats, uptime, vote`)
        .addField(`:robot: Chat Bot`, `chat-channel`)
        .setColor('BLUE')

        const admincommands = new Discord.MessageEmbed()
        .setTitle(`<a:admin_ban:833699001093062696> | Administrator Commands`)
        .addField(`Anti-Alt`, `anti-alt`)
        .addField(`Anti Swear`, `antiswear-on, antiswear-off`)
        .addField(`Custom Commands`, `cc-create, cc-delete, cc-list`)
        .addField(`Moderation`, `antivc, unantivc, ban, purge, kick, lockdown, nick, nuke, reset-nick, slowmode, unban, warn, warns, remove-warn, remove-all-warns, mute, tempmute, unmute`)
        .addField(`Prefix`, `prefix, prefix-reset`)
        .setColor('BLUE')

        const economycommands = new Discord.MessageEmbed()
        .setTitle(`<:aneocoin:828621697174208532> | Economy`, `Economy Commands`)
        .addField(`All Economy Commands`, `bal, buy, daily, inventory, shop, work`)
        .setColor('BLUE')

        const musiccommands = new Discord.MessageEmbed()
        .setTitle(`🎵 | Music`, `Music Commands`)
        .addField(`Commands for music`, `play, stop`)
        .setColor('BLUE')

        const funcommands = new Discord.MessageEmbed()
        .setTitle(`<:lol:833521440711901214> | Fun Commands`, `Fun commands to use`)
        .addField(`Commands`, `8ball, anime, binary, changemymind, clyde, comment, trash, emojify, faceplam, hangman, hug, image, meme, gay, rip, hitler, say, ship, shit, spotify, ascii, tictactoe, translate, trivia, wanted, wasted`)
        .setColor('BLUE')

        const infooo = new Discord.MessageEmbed()
        .setTitle(`ℹ | Info Commands`, `info commands`)
        .addField(`Commands`, `badges, docs, firstmessage, postition, members, ping, roles`)

        const reactionroles = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`🎭 | Reaction Roles`, `Reaction Roles for the server`)
        .addField(`Commands`, `add-role, panel`)

        const rankcommands = new Discord.MessageEmbed()
        .setTitle(`👑 | Ranks`, `Rank commands`)
        .addField(`Ranks`, `addrank, delrank, rank, ranks`)
        .setColor('BLUE')

        const utility = new Discord.MessageEmbed()
        .setTitle(`♾ | Utility`, `Utility Commands!`)
        .addField(`Commands`, `addrole, removerole, autorole, autorole-check, serverinfo, announce, avatar, delete-channel, create-channel, bans, invite, member-count-channel, pull-from-vc, steal, userinfo, worldclock`)

        const welcome =  new Discord.MessageEmbed()
        .setTitle(`🛡 | Welcome`, `Welcome setup`)
        .addField(`Commands`, `canvas-welcome-preview`, `canvas-goodbye-preview, check-channel, set-goodbye-channel, set-channel`)

        message.channel.send(admincommands)
}
}
