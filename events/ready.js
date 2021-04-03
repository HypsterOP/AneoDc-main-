const client = require('../index')
const path = require('path')
const ms = require('ms')
const Schema = require('../models/member-count')

client.on('ready', () =>{
    console.log(`${client.user.username} ✅ hype is da best`)

    client.api.applications(client.user.id).commands.post({
        data: {
            name: 'stonks',
            description: 'stonks?'
        }
    })

    client.ws.on('INTERACTION_CREATE', async interaction => {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: 'Stonks are high!?!??!?'
                }
            }
        })
    })

    client.user.setActivity("h!help | Aneo", {
  type: "STREAMING",
  url: "https://www.youtube.com/channel/UCjGTZFB1kvFi299j-FlSXaQ"
  });
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
