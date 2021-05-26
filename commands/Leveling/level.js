const Discord = require('discord.js');
const canvacord = require('canvacord')
const Levels = require('discord-xp')
const schema = require('../../models/level')
module.exports = {
    name: 'level',
    aliases: [ 'xp'],
    category: 'server',
    timeout: '1000',
    description: "Shows level of a member",

run: async(client, message, args) => {
  const data = await schema.findOne({ Guild: message.guild.id })
  if(!data) return message.channel.send(`Leveling System is not enabled`)
try {
        const user = await Levels.fetch(message.author.id, message.guild.id);

        if(!user) message.lineReply(`Mhm, Looks like you dont have any xp yet!`)

        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
 
         const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format:'png'}))
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRequiredXP(neededXp)
        .setStatus(message.member.presence.status)
        .setProgressBar('WHITE', 'COLOR')
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
         rank.build()
           .then(data => {
            const attachment = new Discord.MessageAttachment
            (data, 'rank.png')
             message.channel.send(attachment);
        })
    } catch (e) {
      console.log(e)
    }
}
};