const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const { getPreview, getTracks } = require('spotify-url-info')
module.exports = {
    name: 'play',
    aliases: ['pl', 'p'],
    description: 'plays a song',
    usage: '<song/url>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try{
            const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
            if(!channel)
              return message.channel.send(new MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle(`${config.femoji} | Please join a Channel first`)
              );
            if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
              return message.channel.send(new MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle(`${config.femoji} | Please join **my** Channel first`)
                .setDescription(`I am in channel: ${message.guild.me.voice.channel.name}`)
              );
            if(!args[0])
              return message.channel.send(new MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle(`${config.femoji} | Please enter a song name or url.`)
                .setDescription(`Usage: \`${await client.prefix(message)}play <url/name>\``)
              );
            message.channel.send(new MessageEmbed()
              .setColor("RANDOM")
              .setTitle("Searching Song")
              .setDescription(`\`\`\`fix\n${args.slice(0).join(' ')}\n\`\`\``)
            ).then(msg=>msg.delete({timeout: 3000}).catch(e=>console.log(e.message)))
            //https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas
            if(args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("track")){
              getPreview(args.join(" ")).then(result => {
                client.distube.play(message, result.title);
              })
            }
            else if(args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("playlist")){
              getTracks(args.join(" ")).then(result => {
                for(const song of result)
                client.distube.play(message, song.name);
              })
            }
            else {
              client.distube.play(message, args.slice(0).join(' '));
            }
          } catch (e) {
              console.log(String(e.stack))
              return message.channel.send(new MessageEmbed()
                  .setTitle(`${config.femoji} | An error occurred`)
                  .setDescription(`\`\`\`${e.stack}\`\`\``)
              );
          }
    }
}