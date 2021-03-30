const client =  require('../index')
const words = require('../curse.json');
const db = require('../reconDB');
const { Message } = require('discord.js');

client.on('message', async(message) => {
    if(await db.has(`swear-${message.guild.id}`) === false) return;

    for (let i = 0; i < words.length; i++) {
        if(message.content.includes(words[i])) {
            message.delete();
            message.channel.send(`${message.author} Do not use bad words.`)
                .then(m => m.delete({ timeout : 3000 }))
        }
    }
})