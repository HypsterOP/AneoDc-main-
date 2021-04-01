const {Client, Message, MessageEmbed } = require ('discord.js');
const translate = require('@iamtraction/google-translate')
module.exports = {
  name: 'translate',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client , message , args) => {
    try {
      const query = args.slice(1).join(" ");
    if (!query) return message.reply("What should i translate? ex - h!translate french hello")
const arg = args[0]

    const translated = await translate(query, {to: `${arg}`});
    const embed = new MessageEmbed()
    .setTitle("Translated!.")
    .addField("Your Word", `\`\`\`fix\n${query}\`\`\``)
    .addField('Selected Language', `\`\`\`fix\n${arg}\`\`\``)
    .addField('Result', `\`\`\`fix\n${translated.text}\`\`\``)
    .setColor("BLUE")
    message.channel.send(embed)

    } catch (error) {
      return message.channel.send("Your question is invalid!")
      .then(() => console.log(error));
    }
  }
}