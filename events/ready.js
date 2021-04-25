const client = require('../index')
const path = require('path')
const ms = require('ms')
const Schema = require('../models/member-count')

client.on('ready', () =>{
    console.log(`${client.user.username} ✅ hype is da best`)

    client.user.setActivity("h!help | Aneo", {
  type: "STREAMING",
  url: "https://www.youtube.com/channel/UCjGTZFB1kvFi299j-FlSXaQ"
  });


});
