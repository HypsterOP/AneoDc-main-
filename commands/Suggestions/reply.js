const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const config = require("../../config.json")
module.exports = {
    name: 'suggestionreply',
    aliases: ['sreply'],
    description : "Reply to a suggestion",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`You dont have permissions.`)

        let sugchannel = await db.fetch(`suggestions_${message.guild.id}`)

        const rtx23 = /^(?:<@!?)?(\d+)>?$/;

        const messageID = args[0];
        if(!messageID) return message.lineReply(`Please give me the id of the message!`)
        const replyQuery = args.slice(1).join(' ');

        const number = new MessageEmbed()
        .setDescription(`config.femoji | That is not a message id!`)
        .setColor('RANDOM')

        const id = new MessageEmbed()
        .setDescription(`config.femoji | Please specify a message id`)
        .setColor('RANDOM')

        const query = new MessageEmbed()
        .setDescription(`${config.femoji} | You forgot to give me the reply!`)
        .setColor("RANDOM")

        const success = new MessageEmbed()
        .setDescription(`${config.semoji} | Replied to the message!`)
        .setColor('RANDOM')

        const noCh = new MessageEmbed()
        .setDescription(`${config.femoji} | This server hasn't setup the suggestion system`)
        .setColor('RANDOM')

        const nomsg = new MessageEmbed()
        .setDescription(`${config.femoji} | Couldn't find a message with that id!`)
        .setColor('RANDOM')

        if(!messageID) return message.channel.send(id)

        if(!rtx23.test(messageID)) return message.channel.send(number)

        if(!replyQuery) return message.channel.send(query)

        try {
            const ssss = message.guild.channels.cache.get(sugchannel)

            const suggetEmbed = await ssss.messages.fetch(messageID).catch(error => {
                message.channel.send(nomsg)
            })

            const data = suggetEmbed.embeds[0];

            const replyEmbed = new MessageEmbed()
            .setAuthor(`${data.author.name}`, data.author.iconURL)
            .setDescription(data.description)
            .setColor("BLUE")
            .addField(`Reply from ${message.author.tag}`, replyQuery)
            .setFooter("Status: Replied")
            .setTimestamp();

            suggetEmbed.edit(replyEmbed)

            message.channel.send(success)

            const user = await client.users.fetch((u) => u.tag === data.author.name)

            const embed = new MessageEmbed()
            .setDescription(`${config.semoji} | You have got a reply for your suggestion, [Click Here To Jump To The Message](https://discord/channels/${sugchannel}/${messageID})`)
            .setColor('RANDOM')
            .setTimestamp();
            user.send(embed)
        } catch(err) {
            return;
        }

    }
}