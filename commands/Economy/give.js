const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'give',
    usage: "h!give <user> <amount>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
        if(!user) return message.reply("You need to mention a user, example h!give @HypsterOP 1000")

        const coins = args[1];
        if(!coins) 
            message.reply(
                "You need to mention the amount of coins!, example h!give @HypsterOP 1000"
            )

        if(isNaN(coins))
          return message.reply("Coins must be a number!");

        const convertedDonationnnnn = parseInt(coins);
        if((await client.bal(message.author.id)) < convertedDonationnnnn)
        return message.reply("You dont even have that many coins LOL");

        // time to remove LOL

        await client.rmv(message.author.id, convertedDonationnnnn);
        await client.add(user.id, convertedDonationnnnn);

        message.channel.send(`${message.author.username} You have given ${user.username} ${convertedDonationnnnn} Coins!`)        
    },
};