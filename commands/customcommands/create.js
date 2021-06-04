const schema = require('../../models/custom-commands');

module.exports = {
    name: 'cc-create',
    run: async(client, message, args) => {
        try {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Please specify a command name');
        if(!response) return message.channel.send('Please specify a response');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('This custom commands already exists!');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Saved **${name}** as a custom command! <a:Success:821621580215877644>`);
    } catch (e) {
        return message.channel.send(`An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`)
    }
    }
}