const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "8ball",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const answers = [
         "As I see it, yes",
 "Ask again later",
 "Better not tell you now",
 "Cannot predict now",
 "Concentrate and ask again",
"Don’t count on it",
 "It is certain",
 "It is decidedly so",
 "Most likely",
 "My reply is no",
 "My sources say no",
 "Outlook not so good",
 "Outlook good",
 "Reply hazy, try again",
 "Signs point to yes",
 "Very doubtful",
 "Without a doubt",
 "Yes",
 "Yes – definitely",
 "You may rely on it,"
      ];
      const a = answers[Math.floor(Math.random() * answers.length)];

      const ques = args.join(' ')
      if(!ques) return message.lineReply(`No i am not answering an empty question`)

      return message.channel.send(
        new MessageEmbed()
        .setAuthor(`8ball`)
        .setDescription(
          `Question: ${args.join(' ')}\nAnswer: ${a}`
        )
        .setColor('RANDOM')
      )
    },
};