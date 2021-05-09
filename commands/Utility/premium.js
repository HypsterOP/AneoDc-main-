const createEmbed = require("../../functions/createEmbed")
const prem = require("../../models/premium");
const premKey = require("../../models/premiumKey");
const { prems } = require("../../Collection/premiumServers")

module.exports = {
  name: "premium",
  usage: "<code>",
    category: "config",
    description: "Activate premium on the server",
    run: async(client, message, args) => {
    let key = args[0];
    if (!key) return message.channel.send(createEmbed("fail", "No key given"));
    if (key === "create") {
      if (
        !require("../../config.json").owners.includes(
          message.author.id
        )
      )
        return message.channel.send(
          createEmbed("fail", "You cannot create keys")
        );
      new premKey({
        Key: Math.floor(Math.random() * 600000000000000),
      })
        .save()
        .then(() => {
          message.channel.send(createEmbed("success", "Created key"));
        });
      return;
    }
    premKey.findOne({ Key: key }, async (err, data) => {
      if (!data)
        return message.channel.send(
          createEmbed("fail", "That key does not exist")
        );
      prem.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          new prem({
            Guild: message.guild.id,
          }).save();
          prems.set(message.guild.id, true);
          premKey.deleteOne({ Key: key }).exec();
          message.channel.send(
            createEmbed("success", "This server now has premium")
          );
        } else
          return message.channel.send(
            createEmbed("fail", "This server is already premium")
          );
      });
    });
  },
};