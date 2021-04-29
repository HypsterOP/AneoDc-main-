const client =  require('../index')
const words = require("../antilink.json")
const db = require('../reconDB');

client.on("message", async(message) => {
    if(await db.has(`antilink-${message.guild.id}`) === false) return;

    for (let i = 0; i < words.length; i++) {
        if(message.content.includes(words[i])) {
            message.delete();
            message.channel.send(`${message.author} You cannot send links here!`)
            .then(m => m.delete({ timeout : 3000 }))
        }
    }
})