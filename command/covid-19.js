const { MessageEmbed } = require("discord.js")
const covid = require("novelcovid")
module.exports = {
    slash: true,
    testOnly: false,
    description: "Global Covid Stats",
    callback: async({  }) => {
        const covidStats = await covid.all()

        let embed = new MessageEmbed()
        .setTitle("Covid-19 Stats")
        .setColor("RANDOM")
        .addFields(
            { name: `Cases`, value: covidStats.cases.toLocaleString(), inline: true },
            { name : `Today's Cases`, value: covidStats.todayCases.toLocaleString(), inline: true },
            { name: `Total Deaths`, value: covidStats.deaths.toLocaleString(), inline: true },
            { name: `Recovered`, value: covidStats.recovered.toLocaleString(), inline: true },
            { name: `Infected`, value: covidStats.active.toLocaleString(), inline: true },
            { name: `Critical Condition`, value: covidStats.critical.toLocaleString(), inline: true },
            { name: `Total Tested`, value: covidStats.tests.toLocaleString(), inline: true },
        )

        return embed
    }
}