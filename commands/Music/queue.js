const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'queue',
    aliases: ['qu', 'q'],
    description: 'Shows the queue',
    usage: '',
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
                .setColor('RANDOM')
                .setTitle(`${config.femoji} | Please join a Channel first`)
              );
            if(!client.distube.getQueue(message))
              return message.channel.send(new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${config.femoji} | I am not playing Something`)
                .setDescription(`The Queue is empty`)
              );
            if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
              return message.channel.send(new MessageEmbed()
                .setColor('random')
                .setTitle(`${config.femoji} | Please join **my** Channel first`)
                .setDescription(`Im in channel: \`${message.guild.me.voice.channel.name}\``)
              );
            let queue = client.distube.getQueue(message);
            if(!queue)
              return message.channel.send(new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${config.femoji} | I am not playing anything`)
                .setDescription(`The Queue is empty`)
              );
      
              let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Queue for: ${message.guild.name}`)
      
              let counter = 0;
              for(let i = 0; i < queue.songs.length; i+=20){
                if(counter >= 10) break;
                let k = queue.songs;
                let songs = k.slice(i, i + 20);
                message.channel.send(embed.setDescription(songs.map((song, index) => `**${index + 1 + counter * 20}** [${song.name}](${song.url}) - ${song.formattedDuration}`)))
                counter++;
              }
      
          } catch (e) {
              console.log(String(e.stack).bgRed)
              return message.channel.send(new MessageEmbed()
                  .setColor('RANDOM')
                  .setTitle(`${config.femoji} | An error occurred`)
                  .setDescription(`\`\`\`${e.stack}\`\`\``)
              );
          }
    }
}