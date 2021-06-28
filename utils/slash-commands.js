const moment = require("moment")
require("dotenv").config();
const AmeClient = require("amethyste-api")
const Discord = require("discord.js")
const commandsrun = async (interaction, client) => {
    const command = interaction.data.name;
    const args = interaction.data.options;
    let AmeApi = new AmeClient(process.env.AME)


    if (command === 'triggered'){ 
          
        if(args){
          var user = client.users.cache.get(args[0].value
)
        }
        else {
var user = interaction.member.user.id;
var user = client.users.cache.get(user);
        }
        const channel = interaction.channel_id;
        let channelsend = client.channels.cache.get(channel);
         client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                  type: 4,
                  data: {
                      content: `Generating! Please wait`
                  }
              }
          })
      const buffer = await AmeApi.generate("triggered", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
      const attachment = new Discord.MessageAttachment(buffer, "triggeredgobrrrr.gif");
   
      
         channelsend.send(attachment);
      }
      if (command === 'stats'){ 
        const embed = new Discord.MessageEmbed()
             .setColor(`RANDOM`)
             .setTitle(`${client.user.username} stats`)
             .setThumbnail(client.user.displayAvatarURL())
             .addField(
               `📂Memory Usage:`,
               (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + "MB",
               false
             )
             .addField(`<:Server_Owner:838109754098188329> Servers Count:`, `${client.guilds.cache.size.toLocaleString()}`, false)
             .addField(`<:bfdverifieduser:838109624183816232> Users Count:`, `${client.users.cache.size.toLocaleString()}`, false)
             .addField(`<:CH_IconGreyTextChannel:838109379898376193> Channels Count:`, `${client.channels.cache.size.toLocaleString()}`, false)
             .addField(`💠Shards:`, `0`, false)
             .addField(`📅 Creation Date -`, `${client.user.createdAt}`, false)
             .addField(`<:nodejs:838108744092876810> Made With :`, `Node.js, MongoDB <:mongo:840262904900747294> And ♥`, false)
             .addField(`👩‍💻 Developers of This Bot -`, `HypsterOP and Tech Infinity`, false)
             .addField(`🥨 Prefix : `, `h!`, false)
           
       
                   await client.api.interactions(interaction.id, interaction.token).callback.post({
                       data: {
                           type: 4,
                           data: {
                               content: "Ayumu's Stats ⬇",
                               embeds:[embed]
                           }
                       }
                   })
               }
}
module.exports = {
    commandsrun
}