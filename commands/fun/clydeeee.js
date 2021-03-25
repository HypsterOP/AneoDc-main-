const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'clyde',
  aliases: ['clyde', 'clydebot'],
  cooldown: 3,
  guildOnly: false,
  async run(client, message, args) {
    const text = args.join(' ');

    if (!text) return message.reply(`Please provide a text.`);

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`,
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setTitle('Clyde')
      .setImage(data.message)
      .setFooter(`Sent by ${message.author.username}`)
      .setColor('BLUE');

    message.reply(embed);
  },
};