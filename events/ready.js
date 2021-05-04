const client = require('../index')
const path = require('path')
const ms = require('ms')
const Schema = require('../models/member-count')
const WokCommands = require("wokcommands")

const guildId = '814117890701787157'
client.on('ready', () =>{
  new WokCommands(client, {
    commandsDir: 'command',
    testServers : [guildId],
    showWarns: false
  })

    console.log(`${client.user.username} ✅ hype is da best`)

    client.user.setPresence({
      status: 'online',
      activity: {
          name: "h!help | Shard #0",
          type: 'WATCHING',    
      }

    
  })

});
