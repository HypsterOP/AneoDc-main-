const client = require('../index')
client.on('guildMemberAdd', async member => {

    if (require('../database/antibot.json')[member.guild.id]) { 
        if (require('../database/antibot.json')[member.guild.id].func === true) {
            let { user_punish, bot_punish } = require('../database/antibot.json')[member.guild.id].settings
    
            if (member.user.bot) {
                let userAddedID = await member.guild.fetchAuditLogs().then((x  => x.entries.first().executor.id));
                let u = await member.guild.members.fetch(userAddedID);
    
                if (member.manageable) {
                    if (bot_punish === 'kick') {
                        member.kick('Anti bot is enabled').catch(() => {
    
                        });
                    }
                    if (bot_punish === 'ban') {
                        member.ban({ reason: 'Anti bot is enabled' }).catch(() => {
    
                        })
                    }
                }
                if (user_punish === 'remove_roles') {
                    u.roles.set([]).catch(() => {
    
                    })
                };
                if (user_punish === 'kick') {
                    u.kick('Added a bot to the server').catch(() => {
    
                    })
                }
                if (user_punish === 'ban') {
                    u.ban({ reason: "Added a bot to the server" }).catch(() => {
    
                    })
                }
    
            }
    
        } else { }
    }    
})