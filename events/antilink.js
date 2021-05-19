const client = require("../index")
const links = require("../links.json")
const db = require("../reconDB")

client.on("message", async(message) => {
    if(await db.has(`link-${message.guild.id}`) === false) return;

    for(let i =0; i < links.length; i++) {
        if(message.author.id === client.user.id) return;
        if(message.content.includes(links[i])) {
            message.delete();
            message.reply(`Please do not send links!`)
                .then(m => m.delete({ timeout: 10000 }))
        }
    }
})