const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      if (message.author.id !== '800331322089537538') return;
      const embed = new MessageEmbed()
          .setTitle('Evaluating...')
      const msg = await message.channel.send(embed);
      try {
          const data = eval(args.join(' ').replace(/```/g, ''));
          const embed = new MessageEmbed()
              .setTitle('Output: ')
              .setDescription(await data)
              .setColor('RANDOM')
          await msg.edit(embed)
          await msg.react('✅')
          await msg.react('❌')
          const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
          msg.awaitReactions(filter, { max: 1 })
              .then((collected) => {
                  collected.map((emoji) => {
                      switch (emoji._emoji.name) {
                          case '✅':
                              msg.reactions.removeAll();
                              break;
                          case '❌':
                              msg.delete()
                              break;
                      }
                  })
              })
      } catch (e) {
          const embed = new MessageEmbed()
              .setTitle('An Error has occured')
          return await msg.edit(embed);

      }
    }
}