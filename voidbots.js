const discord = require("discord.js")
const VoidBotsClient = require("voidbots")
const client = require("./index")
const ayumu = new VoidBotsClient('VOID_zBCXbpnKfj1zzhJL1Roc1ZnfvmaKmJGCxHrbvRJDdXRrjVtw', {autoPost: true, webhookEnabled: true}, client);

ayumu.on("posted", () => {
    console.log("Posted AAHA")
})

ayumu.on('error', e => {
    console.log(`OOPS ${e}`);
})

ayumu.on("voted", data => {
    console.log(`${data.user} has voted for ${data.bot}`)
})