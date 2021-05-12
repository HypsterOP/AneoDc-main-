const commandsrun = async (interaction, client) => {
 
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;
if (command === 'hack'){ 
        const target = args[0].value;
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 6,
                data: {
                    content: `Hacking <@${target}>`
                }
            }
        })
    }
}
module.exports = {
commandsrun
}