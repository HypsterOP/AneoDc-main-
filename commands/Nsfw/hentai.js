const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
    name: 'hentai',
    run: async(client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send(
    new Discord.MessageEmbed()
    .setTitle(`<:error:826449624013078559>`)
    .setDescription(` This is not a nsfw channel!`)
  )
            async function hentaigif() {
            const GIF = await neko.nsfw.randomHentaiGif();
            const embed = new Discord.MessageEmbed()
            .setColor('#202225')
            .setTitle(`${message.author.tag} here's a random hentai gif :flushed:`)
            .setImage(GIF.url)
            message.channel.send(embed);
            }
            hentaigif();
    }
}