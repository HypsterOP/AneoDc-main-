const { MessageEmbed } = require('discord.js')
const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name: 'image',
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('Hello there! Please enter the name of the image you want to view...')

        const results = await google.scrape(query, 1)
        message.reply(
            new MessageEmbed()
            .setTitle('Here is the image you asked for...')
            .setImage(results[0].url)
            .setFooter(`Requested by ${message.author}`)
            .setTimestamp()
        )
    }
}