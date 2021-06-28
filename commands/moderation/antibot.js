const file = require('../../database/antibot.json')
const { MessageEmbed } = require('discord.js');
const fs  = require('fs')

module.exports = {
    name: 'antibot',
    aliases: ['anti-bot'],
    description: 'Enable/disable antibot',
    group: 'management',
    usage: 'antibot [function] <bot_punishment> <user_punishment>',


run: async(client, message, args) => {
    if(!message.member.permissions.has(`ADMINISTRATOR`)) return;
    const func = args[0];
    if (!func) return message.channel.send(`You need to mention an option, on or off`)
    if (!['on', "off"].includes(func)) return message.channel.send(`You need to mention an option, on or off`);


    if (func === 'on') {

    let bot_punish = args[1];
    if (!bot_punish) return message.lineReply(`You need to mention what to do to the bot, kick or ban`)
    if (!['ban', 'kick'].includes(bot_punish)) return message.channel.send(`you need to mention what to do to the bot kick or ban`)

    let user_punish = args[2];
    if (!user_punish) return message.lineReplyNoMention(`Please mention what to do to the user, remove_roles or ban or kick`)
    if (!['remove_roles', 'ban', 'kick'].includes(user_punish)) return message.channel.send(`The options for the user is remove_roles, ban , kick`)




    file[message.guild.id] = {
        func: true,
        settings: {
            user_punish: user_punish,
            bot_punish: bot_punish
        }
    }

    fs.writeFile('./database/antibot.json', JSON.stringify(file, null , 2), (err) => {
        if (err) {

        }
    })

    const changed = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`<:ayumuTick:842630449200889856> anti bot is now \`enabled\` with \`${user_punish}\` as the user punishment and \`${bot_punish}\` as the bot punishment`)

    message.channel.send(changed);
};


    if (func === 'off') {
        file[message.guild.id] = {
            func: false,
            settings: {
                user_punish: "none",
                bot_punish: 'none'
            }
        }
        fs.writeFile('./database/antibot.json', JSON.stringify(file, null, 2), (err) => {})
   
        const disabled = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.success} anti bot is now \`disabled\``)

        message.channel.send(disabled);

    }
}
}