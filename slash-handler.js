client.on('ready', async () => {
    const slashcmds = require("./slash-commands.js");
     client.ws.on('INTERACTION_CREATE', async (interaction) => {
       slashcmds.commandsrun(interaction, client);
    
        })
    console.log(`Connected to Slash-Commands`);
    })