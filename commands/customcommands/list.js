const schema = require('../../models/custom-commands');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "cc-list",
    run: async(client, message, args) => {
        try {
        const data  = await schema.find({ Guild: message.guild.id });
        if(!!data === false) return message.channel.send('There are no custom commands for this server.');
        message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setDescription(
                    data.map((cmd, i) => 
                        `${i + 1}: ${cmd.Command}`
                    ).join('\n')
                )
        )
                } catch(e) {
                    return message.channel.send(`An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`)
                }
    }
}