const moment = require("moment")
require("dotenv").config();
const AmeClient = require("amethyste-api")
const Discord = require("discord.js")
const commandsrun = async (interaction, client) => {
    const command = interaction.data.name.toLowerCase();
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
}
module.exports = {
    commandsrun
}