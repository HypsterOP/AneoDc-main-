const db = require('quick.db')
const client  = require("../index")
const fetch = require("node-fetch")

client.on("message", message => {
    const channel = db.fetch(`chatbotchannel_${message.guild.id}`)
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(message.channel.id === channel) {
        if(message.attachments.size > 0) return;
        if(message.content.includes('@here')) return;
        if(message.content.includes('@everyone')) return;
        else {
           fetch(`http://api.brainshop.ai/get?bid=155786&key=sHHbuPMHWkh8bdMy&uid=0&msg=${encodeURIComponent(message)}`).then(res => res.json())
           .then(data => {
               message.reply(`${data.cnt}`)
           })
        }
    } else if(channel === null) return;
})