const client = require('../index')
const path = require('path')
const ms = require('ms')
const Schema = require('../models/member-count')

client.on('ready', () =>{
    console.log(`${client.user.username} ✅ hype is da best`)

    client.user.setPresence({
      status: 'online',
      activity: {
          name: "h!help | Shard #0",
          type: 'WATCHING',    
      }
  })


});
