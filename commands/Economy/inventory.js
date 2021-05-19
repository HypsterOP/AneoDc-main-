const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'inventory',
    aliases: ['i', "inv"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const profiles = new db.table(`profiles`)

        const user = message.mentions.users.first() || message.author;

        const userProfile = profiles.get(`profiles_${user.id}`);

        if(!userProfile) return message.channel.send(`That user doesn't have a profile!`)

        const bought = profiles.get(`profiles_${user.id}.bought`)

        try {
            const items = Object.entries(bought).map(([key, value]) => {
                return `${capitalise(key)} - ${value}`
            })

            return message.channel.send(new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(`${user.username}'s Inventory`)
            .setDescription(items.join("\n").toLocaleString())
            )
        } catch {
            return message.channel.send(`${user.username}'s Inventory is empty`)
        }
    },
};

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}