const { MessageEmbed } = require("discord.js");
const ee = require('../../config.json')
const { getTracks, getPreview } = require("spotify-url-info")
module.exports = {
    name: "play",
    category: "Music",
    aliases: ["p", "playsong", "playtrack"],
    cooldown: 4,
    usage: "play <url/title>",
    description: "PLays a song from youtube/spotify",
    run: async (client, message, args) => {
    try{
		const prefix = await client.prefix(message);
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | Please join a Channel first`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | Please join **my** Channel first`)
          .setDescription(`*I am in channel: \`${message.guild.me.voice.channel.name}\``)
        );
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | You didn't provide a song name or url!`)
          .setDescription(`Usage: \`${prefix}play url/title\``)
        );
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setTitle("Searching Song")
        .setDescription(`\`\`\`fix\n${args.slice(0).join(' ')}\n\`\`\``)
      ).then(msg=>msg.delete({timeout: 3000}).catch(e=>console.log(e.message)))

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
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Oops~ | An  occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}