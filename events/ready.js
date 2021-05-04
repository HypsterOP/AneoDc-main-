const client = require('../index')
const path = require('path')
const ms = require('ms')
const Schema = require('../models/member-count')
const WokCommands = require("wokcommands")
const { getCommands } = require("../utils")

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

  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size
  }

  // website time baby
  const express = require("express");
  
  const app = express()

  const port = process.env.PORT || 3001;

  app.set('view engine', 'ejs')
  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "..", "pages", "landingPage.html"))
  });

  app.get("/commands", (req, res) => {
    const commands = getCommands();
    res.status(200).render('commands', { commands })
  })

  app.get("/info", (req, res) => {
    res.status(200).send(clientDetails)
  })

  app.listen(port)

});
