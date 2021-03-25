const client = require('../index');
const Schema = require('../models/reaction-roles');
const { MessageEmbed } = require('discord.js')

client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    Schema.findOne({ Message: reaction.message.id }, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.add(roleid)
        user.send(
            new MessageEmbed()
            .setTitle('Obtained a Role!')
            .setDescription(`You have got a role!`)
            .setColor('RANDOM')
        )
    });
});

client.on('messageReactionRemove', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    Schema.findOne({ Message: reaction.message.id }, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid)
        user.send(
            new MessageEmbed()
            .setTitle(`Removed a role`)
            .setDescription('You\'re role has been removed!')
            .setColor('RANDOM')
            )
    });
});