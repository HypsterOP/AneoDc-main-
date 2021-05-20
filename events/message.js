const client = require('../index');
const { Collection, MessageEmbed } = require('discord.js');
const blacklist = require('../models/blacklist');
const mongoose = require('mongoose');
const schema = require('../models/custom-commands');
const db = require('../reconDB');
const db2 = require('quick.db')
const ms = require("ms")
const quick = client.db;

const Timeout = new Collection()

client.on('message', async message =>{


    if(message.author.bot) return;
    if(db2.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db2.get(`afk-${message.author.id}+${message.guild.id}`)
        await db2.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Welcome back, i have removed your afk`)
    }
    if(message.mentions.members.first()) {
        if(db2.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + " is afk, reason:" + db2.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        }else return;
    }else;
    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '811265195186978828') return message.channel.send(`The prefix in ${message.guild.name} is ${p}`)
    }
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
            if (command) command.run(client, message, args, quick)
        } else {
            message.channel.send('You are blacklisted! Try contacting the developer in support server you will find the link of server here - https://aneo.ml')
        }
    })
  })
  