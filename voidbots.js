const discord = require("discord.js")
const VoidBotsClient = require("voidbots")
const client = require("./index")
const aneo = new VoidBotsClient('VOID_zBCXbpnKfj1zzhJL1Roc1ZnfvmaKmJGCxHrbvRJDdXRrjVtw', {autoPost: true, webhookEnabled: true}, client);

aneo.on("posted", () => {
    console.log("Posted AAHA")
})

aneo.on('error', e => {
    console.log(`OOPS ${e}`);
})

aneo.on("voted", data => {
    console.log(`${data.user} has voted for ${data.bot}`)
})