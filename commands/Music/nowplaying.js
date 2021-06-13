const { Client, Message, MessageEmbed } = require('discord.js');
const colors = require('colors')
module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    description: 'Shows the current playing song',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
try {
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

            function createBar(player)
            {
                try{
                    if (!player.queue.current) return `**"[""▇""—".repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
                    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
                    let total = player.queue.current.duration;
                    let size = 15;
                    let bar = String("|") + String("▇").repeat(Math.round(size * (current / total))) + String("—").repeat(size - Math.round(size * (current / total))) + String("|");
                    return `**${bar}**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
                  }catch (e){
                    console.log(String(e.stack).bgRed)
                  }
            }

            const player = message.client.manager.get(message.guild.id);
            if (!player.queue.current)
        return message.channel.send(new MessageEmbed()
          .setColor('RED')
          .setTitle(`Error | There is nothing playing`)
        );
      return message.channel.send(new MessageEmbed()
        .setAuthor(`Current song playing:`, message.client.user.displayAvatarURL({
          dynamic: true
        }))
        .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
        .setURL(player.queue.current.uri)
        .setColor('GREEN')
        .setTitle(`🎶 **${player.queue.current.title}** 🎶`)
        .addField(`🕰️ Duration: `, `\`${format(player.queue.current.duration)}\``, true)
        .addField(`🎼 Song By: `, `\`${player.queue.current.author}\``, true)
        .addField(`🔢 Queue length: `, `\`${player.queue.length} Songs\``, true)
        .addField(`🎛️ Progress: `, createBar(player))
        .setFooter(`Requested by: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
          dynamic: true
        }))
      );
    } catch (e) {
      console.log(String(e.stack))
      return message.channel.send(new MessageEmbed()
        .setColor('RED')
        .setTitle(`ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
    }
}