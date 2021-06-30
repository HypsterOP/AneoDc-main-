const { MessageEmbed } = require("discord.js");
const ee = require("../../config.json");
const { format } = require("../../handlers/functions")
module.exports = {
    name: "seek",
    category: "Music",
    aliases: [""],
    cooldown: 4,
    useage: "seek <Pos. in Seconds>",
    description: "Seek to a position in the track <Seconds>",
    run: async (client, message, args, cmduser, text) => {
    try{
      const prefix = await client.prefix(message);
      const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
      if(!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | Please join a Channel first`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | I am not playing anything!`)
          .setDescription(`The Queue is empty`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | Please join **my** Channel first`)
          .setDescription(`I am in channel: \`${message.guild.me.voice.channel.name}\``)
        );
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Oops~ | You didn't provide a time you want to seek to!`)
          .setDescription(`Usage: \`${prefix}seek 10\``)
        )

      let seektime = Number(args[0]);

      if(seektime < 0)
        seektime = 0;

      if(seektime >= client.distube.getQueue(message).songs[0].duration)
        seektime = client.distube.getQueue(message).songs[0].duration - 1;

      client.distube.seek(message, seektime*1000);

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext,ee.footericon)
        .setTitle(`⏩ Seeking to: ${format(seektime)}`)
      ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))

    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Oops~ | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}