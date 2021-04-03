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

    const AntiSwear = new Discord.MessageEmbed()
    .setTitle("AntiSwear <:antiswear:824494436640620594>")
    .addField(`antiswear-on`, `Turns on the anti swear so that users messages containing bad words will be deleted`)
    .addField(`antiswear-off`, `Turns off the antiswear so users can send bad words.`)
    .setTimestamp()
    .setColor('BLUE')

    const Birthday = new Discord.MessageEmbed()
    .setTitle(`Birthday :birthday:`)
    .addField(`set-birthday`, `Use this command to set your birthday - Example h!set-birthday 1/10.`)
    .addField(`check-birthday`, `You can check your birthday which you have set!`)
    .setTimestamp()
    .setColor('BLUE')

    const Bot = new Discord.MessageEmbed()
    .setTitle("Bot <a:bot:823925462568271943>")
    .addField(`report-bug`,`If there is any bug or issue u can use this command so it sends it to my owner.`)
    .addField(`ping`, `Shows the ping of the bot and api`)
    .addField(`feedback`, `you can give a valuable feed back about the bot :slight_smile:`)    
    .addField(`uptime`, `Shows the uptime`)
    .addField(`stats`, `shows the stats of the bot`)
    .setTimestamp()
    .setColor('BLUE')

    const CustomCommands = new Discord.MessageEmbed()
    .setTitle("Custom Commands 🛃")
    .addField(`cc-create`, `creates a custom command that u can use with the prefix - example h!cc-create Hypster HypsterOP, the bot responds if you type h!Hypster.`)
    .addField(`cc-delete`, `You can delete a custom command with the name if you do not want it - example h!cc-delete Hypster`)
    .addField(`cc-list`, `Gives you the list of custom commands in server`)
    .setColor('BLUE')
    .setTimestamp()

    const fun = new Discord.MessageEmbed()
    .setTitle("Fun <a:toofunny:824495237053022218>")
    .addField(`anime`, `Search for you favorite anime - example h!anime Naruto`)
    .addField(`binary`, `Encode or decode a binary - example h!binary encode Hypster, h!binary decode 01001000 01111001 01110000 01110011 01110100 01100101 01110010`)
    .addField('change My Mind', `this is a fun canvas command for using th command you need to do - h!changemymind Hypster Is The best`)
    .addField(`comment`, `This is a canvas command which comments what you type!`)
    .addField(`emojify`, `Type a text and it will convert it into emojis`)
    .addField(`hangman`, `Starts a Hangman game`)
    .addField(`image`, `Searches for a image that you typed and will you send that image.`)
    .addField('solve', `Solves a math equation - example h!solve 69+90`)
    .addField(`meme`, `Sends a random meme`)
    .addField(`say`, `sends the message of the user from the bot - example h!say Hello!`)
    .addField(`ascii`, `Converts a text to image art`)
    .addField(`tictactoe`, `Starts a tictactoe game with the mentioned user.`)
    .addField(`translate`, `translates the inputed text to english`)
    .addField(`trigger`, `A canvas command which triggers a user`)
    .addField(`trivia`, `Starts a trivia game`)
    .addField(`wanted`, `A canvas command which puts the users picture in a wanted picture!`)
    .addField(`wasted`, `A canvas command which puts the users avatar in a wasted picture`)
    .addField(`kiss`, `kisses the mentioned user`)
    .addField(`hug`, `hugs the mentioned user`)
    .addField(`clyde`, `image manupilation of clyde`)
    .addField(`spotify`, `shows what song the user is listening to!`)
    .addField(`hack`, `hacks the mentioned user **__but fake xd__**`)
    .addField(`joke`, `Gives a random dad joke`)
    .setTimestamp()
    .setColor('BLUE')

    const chatbot = new Discord.MessageEmbed()
    .setTitle(`Chat Bot`)
    .addField(`chat-channel`, `sets the mentioned channel as a chat bot channel`)
    .setColor('BLUE')

    const help = new Discord.MessageEmbed()
    .setTitle("Info <:info:824495373359775744>")
    .addField(`badges`, `Shows the badges of a user.`)
    .addField(`docs`, `shows the docs of discord.js - example h!docs message.author`)
    .addField(`firstmessage`, `Shows the first message in a channel`)
    .addField(`help`, `shows this command`)
    .addField(`postion`, `shows the postion when u joined`)
    .addField(`members`, `Shows the list of members who joined first and last`)
    .addField(`roles`, `Shows the roles of a user`)
    .setTimestamp()
    .setColor('BLUE')

    const moderation = new Discord.MessageEmbed()
    .setTitle("Moderation <a:moderator:824495641509232642>")
    .addField(`antivc`, `If a user is earraping in a vc you can remove him/her and antivc him/her so that he/she can'\t join or tak but he can send messages.`)
    .addField(`unantivc`, `The user can join the vc again`)
    .addField(`ban`, `Bans a mentioned user`)
    .addField(`kick`, `kicks a user from the server`)
    .addField(`clear/purge`, `Deletes some messages example - h!purge 68`)
    .addField(`warn`, `warns a mentioned users`)
    .addField(`warns`, `Check the warns of a user`)
    .addField(`remove-all-warns`, `Removes all the warns from a mentioned user.`)
    .addField(`remove-warn`, `removes the mentioned warns from a mentioned user`)
    .addField(`nick`, `change the nickname of a mentioned user`)
    .addField(`reset`, `resets the nickname of the user`)
    .addField(`lockdown`, `lock down your server by typing h!lockdown true to remove it h!lockdown false`)
    .addField(`nuke`, `nukes a channel`)
    .addField(`slowmode`, `To change the slow mode - example h!slowmode 5s, to reset the slow mode just do h!slowmode`)
    .setColor('BLUE')
    .setTimestamp()

    const mute = new Discord.MessageEmbed()
    .setTitle("Mute :zipper_mouth:")
    .addField(`mute`, `Mutes a user.`)
    .addField(`tempmute`, `mutes a user for the mentioned time.`)
    .addField(`unmute`, `unmutes a user.`)
    .setColor('BLUE')
    .setTimestamp()

    const pre = new Discord.MessageEmbed()
    .setTitle("Prefix <:premium:824499349543059457>")
    .addField(`prefix`, `Changes the prefix example h!prefix b!`)
    .addField(`prefix-reset`, `resets the prefix back to h!`)
    .setColor('BLUE')
    .setTimestamp()

    const ranks = new Discord.MessageEmbed()
    .setTitle(`Ranks <a:level:824500274403606589>`)
    .addField(`addrank`,`adds a new rank`)
    .addField(`delrank`, `deletes a rank.`)
    .addField(`rank`, `helps you to take a rank.`)
    .addField(`ranks`, `shows all the avaliable ranks`)
    .setColor('BLUE')
    .setTimestamp()

    const rr = new Discord.MessageEmbed()
    .setTitle("Reaction Roles <:Hype_Role:821003023835987998>")
    .addField(`add-role`, `adds a role to the reaction roles`)
    .addField(`panel`, `shows the the reaction roles.`)
    .setColor('BLUE')
    .setTimestamp()

    const util = new Discord.MessageEmbed()
    .setTitle('Utility <a:utilssystem:824499990709665812>')
    .addField(`addrole`, `adds a role to a user mentioned`)
    .addField(`removerole`, `removes a role from a user`)
    .addField(`announce`, `You can announce any message in any channel if you want a ping to also be there use -ping at the end of the message`)
    .addField(`autorole`, `adds the role to a user when he/she joins`)
    .addField(`autorole-check`, `you can check the current autorole, i am really sorry but once you add an auto role you cant delete it but you change it i will try to make a command on that.`)
    .addField(`avatar`, `Shows the avatar of a mentioned user or the user of the message`)
    .addField(`create`, `create a channel`)
    .addField(`delete`, `deletes a mentioned channel`)
    .addField(`bans`, `check the total number of bans in your server`)
    .addField(`invite`, `you can invite the bot.`)
    .addField(`member-count-channel`, `creates a member count voice channel which updates every 2mins`)
    .addField(`pull-from-vc`, `pulls a user from a different vc to your vc.`)
    .addField(`serverinfo`, `shows the server info`)
    .addField(`steal`, `add an emoji you can add upto 100emojis at a time`)
    .addField(`worldclock`, `World clock simple and neat.`)
    .setColor('BLUE')
    .setTimestamp()

    const welc = new Discord.MessageEmbed()
    .setTitle("Welcome Channel <a:gifsc_welcome:824505179902312488>")
    .addField(`set-channel`, `sets a welcome channel, well you cant remove it so think twice and the removing command will be added.`)
    .addField(`set-goodbye-channel`, `sets it as a goodbye channel (cannot be removed)`)
    .addField(`check-channel`, `shows the welcome channel (if there is any)`)
    .addField(`canvas-welcome-preview`, `shows the preview of the welcome image.`)
    .addField(`canvas-goodbye-preview`, `shows the goodbye image preview.`)
    .setTimestamp()
    .setColor('BLUE')


    const pages = [
      AntiSwear,
      Birthday,
      Bot,
      CustomCommands,
      fun,
      help,
      moderation,
      mute,
      pre,
      ranks,
      rr,
      util,
      chatbot,
      welc

    ]

    const emojilist = ["◀", "▶"]

    const timeout = `300000`

    pagination(message, pages, emojilist, timeout)
  }
}