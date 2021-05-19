const { Client, Message, MessageEmbed } = require('discord.js');
const discord = require("discord.js")
module.exports = {
    name: 'embed',
    aliases: ['em'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let questions = {
            firstQuestion: "Please type the embed title! it will look like this - https://imgur.com/imSLCsI",
            secondQuestion: "Please type the embed Description! - it will look like this - https://imgur.com/dZwxlYk",
            thirdQuestion: "Please type the color! It can be a color like red or a hex code.",
            fourthQuestion: "Please type the footer - it will look like this - https://imgur.com/QLPzngb",
        }
           
            message.channel.send(questions.firstQuestion).then(msg => {
                const filter1 = m => m.author.id === message.author.id
                msg.channel.awaitMessages(filter1, {
                    time: 5 * 60000,
                    max: 1
                }).then(messages => {
                    let msg1 = messages.first().content
                    if(msg1.toLowerCase() === "cancel") return message.channel.send("Cancelled.")
                    message.channel.send(questions.secondQuestion).then(msg => {
                        const filter1 = m => m.author.id === message.author.id
                        msg.channel.awaitMessages(filter1, {
                            time: 5 * 60000,
                            max: 1
                        }).then(messages => {
                            let msg2 = messages.first().content
                            if(msg2.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                            message.channel.send(questions.thirdQuestion).then(msg => {
                                const filter1 = m => m.author.id === message.author.id
                                msg.channel.awaitMessages(filter1, {
                                    time: 5 * 60000,
                                    max: 1
                                }).then(messages => {
                                    let msg3 = messages.first().content.toUpperCase()
                                    if(msg3.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                    message.channel.send(questions.fourthQuestion).then(msg => {
                                        const filter1 = m => m.author.id === message.author.id
                                        msg.channel.awaitMessages(filter1, {
                                            time: 5 * 60000,
                                            max: 1
                                        }).then(messages => {
                                            let msg4 = messages.first().content
                                            if(msg4.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                            console.log("Embed created")
                                                
                                                        message.channel.send(
                                                            new discord.MessageEmbed()
                                                                .setTitle(msg1)
                                                                .setDescription(msg2)
                                                                .setColor(msg3)
                                                                .setFooter(msg4)
                                                        )
                                                
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
    }
}