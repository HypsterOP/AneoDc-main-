const client = require('../index')
const path = require('path')
const ms = require('ms')
const Schema = require('../models/member-count')

client.on('ready', () =>{
    console.log(`${client.user.username} ✅ hype is da best`)

    client.user.setActivity(`h!help || https://aneo-xyz.glitch.me`)

    setInterval(() => {
        Schema.find().then((data) => {
            if(!data && data.length) return;

            data.forEach((value) => {
                const guild = client.guilds.cache.get(value.Guild);
                const memberCount = guild.memberCount;

                if(value.Member != memberCount) {
                    console.log("The membercount differs")
                    const channel = guild.channels.cache.get(value.Channel);
                    channel.setName(`Members: ${memberCount}`)

                    value.Member = memberCount;
                    value.save();
                }
        });
    });

}, ms('2 minutes'));
});
