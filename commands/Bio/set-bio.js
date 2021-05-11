const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require("../../models/bio")
module.exports = {
    name: 'set-bio',
    aliases: ['sb'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args.join(" ")) return message.reply(
			new MessageEmbed()
				.setTitle("Error! Too few arguments")
				.setDescription(`Usage: setbio <bio>`)
		)
		Schema.findOne({ User: message.author.id }, async (err, data) => {
			if (data) data.delete();
			new Schema({
				User: message.author.id,
				Bio: args.join(" ")
			}).save();
		})
		message.reply(
			`Successfully Updated Your Bio`
		)
    }
}