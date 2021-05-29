const Discord = require('discord.js');
require('../../ExtendedMessage');
module.exports = {
	name: 'shop',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */

	run: async (client, message, args) => {
		if (args[0] === 'diamond') {
			message.channel.send(
				new Discord.MessageEmbed()
					.setTitle(`Diamond`)
					.setThumbnail(
						'https://images-ext-2.discordapp.net/external/fW1Q2pOMKmu7xkdUIpgmUPtYYvWrGq-9dfsiZQGgthc/https/cdn.dribbble.com/users/45518/screenshots/1611861/duamon.jpg?width=749&height=562'
					)
					.setDescription(
						`This is just a show item, use this to flex on people 💪`
					)
					.addField(`🤑 Selling Price`, `100,000,000`)
					.addField(`💲 Item Price`, `250,000,000`)
					.setColor('RANDOM')
			);
		} else if (args[0] === 'miner') {
			message.channel.send(
				new Discord.MessageEmbed()
					.setTitle(`Miner`)
					.setThumbnail(
						'https://cdn.discordapp.com/attachments/838741259212423178/848176280343543818/26cf.png'
					)
					.setDescription(
						`Miner lets you earn upto 1000 coins per day, all you have to do is just buy it and use it once per day`
					)
					.addField(`🤑 Selling Price`, `500`)
					.addField(`💲 Item Price`, `1,000`)
					.setColor('RANDOM')
			);
		} else if (args[0] === 'car') {
      message.channel.send(
        new Discord.MessageEmbed()
        .setTitle(`Car`)
        .setThumbnail('https://cdn.discordapp.com/attachments/838741259212423178/848177116154429461/car-emoji-by-twitter.png')
        .setDescription(`Wohohooooooooo! Go drive a car once a day and earn upto 10,000 coins!`)
        .addField(`🤑 Selling Price`, `3,000`)
        .addField(`💲 Item Price`, `5,000`)
        .setColor('RANDOM')
      )
		} else if (args[0] === 'mansion'){
      message.channel.send(
        new Discord.MessageEmbed()
        .setTitle(`Mansion`)
        .setThumbnail('https://cdn.discordapp.com/attachments/838741259212423178/848178106225131520/house-apple.png')
        .setDescription(`Buy a mansion and collect rent from tenants once a week!, you can earn upto 30000 coins!`)
        .addField(`🤑 Selling Price`, `10,000`)
        .addField(`💲 Item Price`, `20,000`)
        .setColor('RANDOM')
      )
    } else if (args[0] === 'minecraft') {
      message.channel.send(
        new Discord.MessageEmbed()
        .setTitle(`Minecraft`)
        .setThumbnail('https://cdn.discordapp.com/attachments/838741259212423178/848178872460771348/png-clipart-minecraft-video-game-mod-emoji-minecraft-grass-video-game.png')
        .setDescription(`Play minecraft and earn some coins`)
        .addField(`🤑 Selling Price`, `35`)
        .addField(`💲 Item Price`, `50`)
        .setColor('RANDOM')
        )
    }
     else if (!args[0]) {
			let embed = new Discord.MessageEmbed()
				.setTitle('The Shop **Cheap Until 1K Servers!**')
				.addField(
					'💎 Diamond - **250,000,000**',
					`Buy a diamond and flex 💪 on people!`
				)
				.addField(
					'⛏ Miner — **1,000**',
					`Buy A Miner, And It Earns You With 1000 Coins Daily!`
				)
				.addField(
					'🚗 Car — **5,000**',
					`Use A Car To Go Drivin' And Earn Upto 10000 Coins!`
				)
				.addField(
					'🏠 Mansion — **20,000**',
					`Buy A Mansion And You Can Rent It Out To People And Collect An Amount Anywhere From 2000 To 30000 Coins Weekly!`
				)
				.addField('🖍 Minecraft — **50**', `Play Minecraft And Win Money!`)
				.setColor('RANDOM')
				.setFooter(
					'Type h!buy [item name] to buy the item! To use it, h!use [item]'
				);
			message.channel.send(embed);
		}
	},
};
