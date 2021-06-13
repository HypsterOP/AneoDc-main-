const { Client, Message, MessageEmbed } = require('discord.js');
const colors = require('colors')
module.exports = {
    name: 'seek',
    aliases: ['see', 'se'],
    description: 'Seek the music',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
try{
            function createBar(player)
            {
                try{
                    if (!player.queue.current) return `**"[""🔘""▬".repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
                    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
                    let total = player.queue.current.duration;
                    let size = 15;
                    let bar = String("| ") + String("🔘").repeat(Math.round(size * (current / total))) + String("▬").repeat(size - Math.round(size * (current / total))) + String(" |");
                    return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
                  }catch (e){
                    console.log(String(e.stack).bgRed)
                  }
            }

            function format(millis)
            {
                try {
                    var h = Math.floor(millis / 3600000),
                      m = Math.floor(millis / 60000),
                      s = ((millis % 60000) / 1000).toFixed(0);
                    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
                    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
                  } catch (e) {
                    console.log(String(e.stack).bgRed)
                  }
            }

            const player = message.client.manager.get(message.guild.id);
            if (Number(args[0]) < 0 || Number(args[0]) >= player.queue.current.duration / 1000)
              return message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTitle(` Error | You may seek from \`0\` - \`${player.queue.current.duration}\``)
              );

            player.seek(Number(args[0]) * 1000);
            return message.channel.send(new MessageEmbed()
              .setTitle(`Success | Seeked song to: ${format(Number(args[0]) * 1000)}`)
              .addField(`Progress: `, createBar(player))
              .setColor('GREEN')
            );
          } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
              .setColor('RED')
              .setTitle(`ERROR | An error occurred`)
              .setDescription(`\`\`\`${e.message}\`\`\``)
            );
          }
    }
}