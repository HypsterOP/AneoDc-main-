const client = require('../index')
const colors = require('colors')

client.on('guildBanAdd', async(guild, user) => {

	const fetchLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD'
	});

	const fetchLogsError = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});

	await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	}).catch(() => {
		console.error(`Unabled to log guildBanAdd event`.bgRed)
	})


	const banLOG = fetchLogs.entries.first();

	if(!banLOG){
		return console.error(`${user.tag} was banned in ${guild.name} but no audit logs L`.red)
	}

	const { executor, target, createdAt } = banLOG;

	if(target.id === user.id) {
		console.log(`${user.tag} got banned in ${guild.name} by ${executor.tag}`.bgMagenta);
	} else if (target.id === executor.id){
		return;
	}

	// lets check if user is trusted.  //

	const guildID = guild.id;

	const Info = require(`../database/guilds/${guildID}.json`)

	const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${user.id}`)
    	const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${user.id}`)

	if(executor.id === client.user.id) {
		return;
	} else if (executor.id === guild.owner.id){
		return;
	} else if (executor.id === Trusted){
		return;
	} else {
		await guild.member(executor).ban({
			reason: `Un Authorized ban.`
		}).catch(err => {
			console.log(`Unabled to ban user: ${err}`)
			guild.owner.send(`I was unable to ban a user, because they banned someone. User Name: ${executor.tag}, Reason of why i couldn't ban: ${err} `)
		}).then(guild.owner.send(`**Unauthorized ban**\n**Banned By**: ${executor.tag}\n**Victim**: ${target.tag}\n**Banned Time**: ${createdAt.toDateString()}\n**Punishment**: **BAN**`)).catch(err => {
			return
		});
	}
})

// **KICK** //

client.on('guildMemberRemove', async member => {

	const fetchLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK'
	})

	const fetchLogsError = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	}).catch(err => {
		console.error(err)
	});


	const kickLOG = fetchLogs.entries.first();

	if(!kickLOG){
        return console.log(red(`${member.user.tag} was kicked in ${member.guild.name} but nothing was registered in the audit log...`));
    }

    const { executor, target, createdAt } = kickLOG;

    if(target.id === member.id) {
	    console.log(`${member.user.tag} got kicked in ${member.guild.name} by ${executor.tag}`.grey)
    } else if (target.id === executor.id){
	    return
    }

//  TRUSTED?   //

    const guildID = member.guild.id

    const Info = require(`../database/guilds/${guildID}.json`)

    const WhiteListedUser = Info.Data.WhiteListedUserIDs.find((us) => us === `${member.id}`)
    const Trusted = Info.Data.TrustListedUserIDs.find((u) => u === `${member.id}`)

    if(executor.id === client.user.id){
	    return;
    } else if (executor.id === member.guild.owner.id){
	    return;
    } else if (executor.id === Trusted){
	    return;
    } else {
	    member.guild.members.ban(executor.id, {
		    reason: `Unauthorized Kick`
	    }).catch(() => {
		    return console.log(`Unable to kick someone.`)
	    }).then(member.guild.owner.send(`**UnAuthorized Kick**\n**Kicked By**: ${executor.tag}\n**Victim**: ${target.tag}\n**Time**:${createdAt.toDateString()}\n**Punishment**: **KICK**`)).catch((err) => {
		return console.log(red("ERROR: BAN WAS NOT FULLY EXECUTED"));
	    })
    }
})