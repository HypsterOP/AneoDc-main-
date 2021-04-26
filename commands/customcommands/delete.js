const schema = require('../../models/custom-commands');

module.exports = {
    name: 'cc-delete',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;

        const name = args[0];

        if(!name) return message.channel.send('Please tell me the name of the command you want to delete.');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('That custom command does not exist! ');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`Removed **${name}** from custom commands! <a:Success:821621580215877644>`);
    }
}