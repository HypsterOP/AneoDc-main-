const { Client, Message, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    aliases: ["lb"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const collection = new Collection()

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.bal(id)
                // console.log(`${member.user.tag} -> ${bal}`)
                return bal !== 0 ? collection.set(id, {
                    id,
                    bal,
                })
                : null
            })
        );

        const data = collection.sort((a, b) => b.bal - a.bal).first(10);

        message.channel.send(
            new MessageEmbed()
            .setTitle(`Leaderboard for ${message.guild.name}`)
            .setDescription(
                data.map((v, i) => {
                    return `${i+1}) ${client.users.cache.get(v.id).tag} ➡ **${v.bal}** coins`
                })
            )
        )
    }
}