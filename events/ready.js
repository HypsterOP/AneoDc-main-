const client = require('../index')
const path = require('path')
const ms = require('ms')
const Schema = require('../models/member-count')
const WokCommands = require("wokcommands")
const Schema1 = require("../models/blacklist-word");
const {BlacklistedWords} = require("../Collection")
const guildId = '814117890701787157'
client.on('ready', () =>{
  new WokCommands(client, {
    commandsDir: 'command',
    testServers : [guildId],
    showWarns: false
  })

    console.log(`${client.user.username} ✅ OP`)

    Schema1.find()
    .then((data) => {
      data.forEach((val) => {
        BlacklistedWords.set(val.Guild, val.Words)
      })
    })

    const timeModels = [
      "11 Hours",
      "10 Hours",
      "9 hours",
      "8 Hours",
      "7 Hours",
      "6 hours",
      "5 Hours",
      "4 Hours",
      "3 Hours",
      "2 Hours",
      "1 Hour"
    ]

    setInterval(function() {

      client.user.setPresence({
        status: 'online',
        activity: {
            name: `h!help | Happy Birthday TechInfinty(CEO) and Discord in ${timeModels}`,
            type: 'STREAMING',
            url: "https://twitch.tw/discord"    
        }
  
      
    })
    }, 3600000)

});
