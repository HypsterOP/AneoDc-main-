const client = require('../index')
const db = require(`quick.db`);
const { MessageEmbed } = require('discord.js');
client.on('messageReactionAdd', async( reaction, user ) => {
    if(reaction.emoji.name === '⭐')
    {
        db.add(`reactionstar_${reaction.message.id}`, 1)
        let testcount = db.fetch(`reactionstar_${reaction.message.id}`);
        var target = db.fetch(`targetstar_${reaction.message.channel.guild.id}`);
        if(!target)
        {
            var target = 3;
        }
        if(testcount > target)
        { let checking = db.fetch(`alreadyornot_${reaction.message.id}`)
           if(checking === "yes")
           {
               return;
           }
           db.set(`alreadyornot_${reaction.message.id}`, "yes")
           var channel2 = db.fetch(`starboard_${reaction.message.channel.guild.id}`)
           const channelto = client.channels.cache.get(channel2);
           var content = reaction.message.content;
           if(!content || content === "")
           {
               var content = 'Embed';
           }
           const embed = new MessageEmbed()
           .setAuthor(reaction.message.author.username, reaction.message.author.displayAvatarURL({ dynamic: true }))
           .setDescription(`message: ${content}`)
           .addField(`Source`, `[Jump!](${reaction.message.url})`)
           .setFooter(`${testcount} Stars ⭐`)
           .setTimestamp()
           .setColor('RANDOM');

           channelto.send(`:star: ${testcount} - ${reaction.message.channel}`, embed );
        }
    } else {
        return;
    }
})