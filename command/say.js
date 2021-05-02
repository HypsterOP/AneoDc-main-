const { MessageEmbed } = require("discord.js")

module.exports = {
    slash: true,
    testOnly: true,
    description: "Says whatever you type only as an embed description, also color must be in capital letters!",
    minArgs: 2,
    expectedArgs : "<word> <color>",

    callback: ({ args }) => {
        const embed = new MessageEmbed()
        
        const [word, color] = args

        embed.setDescription(word)
        embed.setColor("RANDOM")

        return embed
    }
}