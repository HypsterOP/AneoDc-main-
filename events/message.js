const client = require('../index');
const { Collection } = require('discord.js');
const blacklist = require('../models/blacklist');
const mongoose = require('mongoose');
const schema = require('../models/custom-commands');
const db = require('../reconDB');
const db2 = require('quick.db')
const ms = require("ms")


const Timeout = new Collection()

client.on('message', async message =>{

    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '811265195186978828') return message.channel.send(`The prefix in ${message.guild.name} is ${p}`)
    }
    if(message.author.bot) return;
    if(!message.content.startsWith(p)) return;
    if (!message.content.startsWith(p)) return;
    blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            if (!message.guild) return;
            if (!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(p.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if (cmd.length == 0) return;
            const data = await schema.findOne({ Guild: message.guild.id, Command: cmd });
            if(data) message.channel.send(data.Response)
            let command = client.commands.get(cmd)
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) command.run(client, message, args)
        } else {
            message.channel.send('You are blacklisted! Try contacting the developer in support server you will find the link of server here - https://aneo.ml')
        }
    })
  })
  