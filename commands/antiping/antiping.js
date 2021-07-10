/* eslint-disable no-unused-vars */
const { MessageEmbed, Message, Client, Permissions } = require("discord.js");
const schema = require("../../models/anti-ping");

module.exports = {
  name: "anti-ping",
  description: "Settings of Anti-Ping",
  timeout: "1000",
  aliases: ["anti-ping-set"],
  usage: "[add/remove/display]",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @returns
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return message.channel.send({ content: `You can't use this command` });
    const query = args[0];
    if (!query)
      return message.channel.send({
        content: `You need to provide query. \`add\` to add member ; \`remove\` to remove member ; \`display\` to display all members`,
      });
    if (!["add", "remove", "display"].includes(query.toLowerCase()))
      return message.channel.send({
        content: `You need to provide correct query. \`add\` to add member ; \`remove\` to remove member ; \`display\` to display all members`,
      });
    const guild = { Guild: message.guild.id };
    if (query.toLowerCase() == "add") {
      const word =
        (await message.mentions.members.first()) ||
        message.guild.members.cache.get(args[1]);
      if (!word)
        return message.channel.send({
          content: `You need to mention member to add`,
        });
      schema.findOne(guild, async (err, data) => {
        if (data) {
          if (data.Member.includes(word.id))
            return message.channel.send({
              content: `${word.user.tag} is already in anti-ping`,
            });
          data.Member.push(word.id);
          data.save();
          message.channel.send({
            content: `${word.user.tag} has been added to Anti-Ping system`,
          });
        } else if (!data) {
          new schema({
            Guild: message.guild.id,
            Member: word.id,
          }).save();
          message.channel.send({
            content: `${word.user.tag} has been added to Anti-Ping system`,
          });
        }
      });
    } else if (query.toLowerCase() == "remove") {
      const word =
        (await message.mentions.members.first()) ||
        message.guild.members.cache.get(args[1]);
      if (!word)
        return message.channel.send({
          content: `You need to mention member to remove`,
        });
      schema.findOne(guild, async (err, data) => {
        if (!data)
          return message.channel.send({
            content: `There is no member in Anti-Ping`,
          });
        if (!data.Member.includes(word.id))
          return message.channel.send(
            `${word.user.tag} isn't in Anti-Ping system`
          );
        const filtered = data.Member.filter((c) => c !== word.id);
        await schema.findOneAndUpdate(guild, {
          Guild: message.guild.id,
          Member: filtered,
        });
        message.channel.send({
          content: `${word.user.tag} has been removed from Anti-Ping system`,
        });
      });
    } else if (query.toLowerCase() == "display") {
      schema.findOne(guild, async (err, data) => {
        if (!data)
          return message.channel.send({
            content: `There is no member in Anti-Ping system`,
          });

        let embed = new MessageEmbed()
          .setTitle(`Anti-Ping`)
          .setDescription(
            `<@${
              data.Member.join("> <@") ||
              `There is no member in The Anti-Ping system`
            }>`
          );
        message.channel.send({ embeds: [embed] });
      });
    }
  },
};
