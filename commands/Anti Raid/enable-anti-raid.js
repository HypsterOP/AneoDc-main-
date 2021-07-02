const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'enable-anti-raid',
    aliases: ['era'],
    description: 'Enable anti raid module',
    usage: 'on/off',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const db = client.db;
        let optios = ['on', 'off']
        
        let word =args[0];

        if(!args[0]) message.channel.send(`Please mention an option: on or off`)

            if(args[0] === 'on') {
                if(db.has(`anti_raid-${message.guild.id}`)) return message.channel.send(`Anti Raid Module is already enabled.`)
                await db.set(`anti_raid-${message.guild.id}`, `on`);
                message.channel.send(`Turned on anti raid module.`)
            }
            if(args[0] === 'off') {
                if(!db.has(`anti_raid-${message.guild.id}`)) return message.channel.send(`Anti Raid Module is not enabled.`)
                await db.delete(`anti_raid-${message.guild.id}`).then(() => console.log(`DELETED./`));
                message.channel.send(`Deleted anti raid module.`)
            }

            let thingy =args[1]

            if(!args[0]) message.channel.send(`Please mention an option, either: remove_roles, kick, ban, mute, warn`)
    }
}