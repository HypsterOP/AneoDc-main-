const { CommandInteraction, Client } = require('discord.js');
const axios = require('axios')

module.exports = {
  name: 'dog',
  description: 'Shows are random cute dog!',
  /**
    @param {CommandInteraction} interaction
    @param {Client} client
    @param {String[]} args
  */
  run: async(client, interaction, args) => {
     let dogimg = await axios.default.get(`https://some-random-api.ml/img/dog`).then(res => {
         interaction.editReply({ content: res.data.link })
     });
  }
}