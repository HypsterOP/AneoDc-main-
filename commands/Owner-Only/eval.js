const Discord = require('discord.js');
const { post } = require('node-superfetch');
const config = require("../../config.json")
module.exports = {
	name: 'eval',
	aliases: ['ev', 'e'],
	category: 'owner',
	ownerOnly: true,

	run: async (client, message, args) => {
        if(!require("../../config.json").owners.includes(
            message.author.id
        )) return message.channel.send(`Please do not try to break me!`)
		const eembed = new Discord.MessageEmbed()
			.setDescription('Evaluating...')
			.setColor('RANDOM');
		const msg = await message.channel.send(eembed);

		const embed = new Discord.MessageEmbed().addField(
			'📥 Input',
			'```js\n' + args.join(' ') + '```'
		);

		try {
			const error = new Discord.MessageEmbed()
				.setDescription(
					`${config.femoji} | Please put the code to evaluate!`
				)
				.setColor('RED');
			const code = args.join(' ');
			if (!code) return msg.edit(error);
			let evaled = eval(code);

			if (typeof evaled !== 'string')
				evaled = require('util').inspect(evaled, { depth: 0 });

			let output = clean(evaled);
			if (output.length > 1024) {
				// If the output was more than 1024 characters, we're gonna export them into the hastebin.
				const { body } = await post('https://hastebin.com/documents').send(
					output
				);
				embed.addField('📤 Output', `https://hastebin.com/${body.key}.js`);
				embed.setColor('RANDOM');
				// Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
			} else {
				embed.addField('📤 Output', '```js\n' + output + '```');
				embed.setColor('RANDOM');
				embed.addField('Type', '```js\n' + typeof evaled + '```');
			}

			await msg.edit(embed);
		} catch (error) {
			let err = clean(error);
			if (err.length > 1024) {
				// Do the same like above if the error output was more than 1024 characters.
				const { body } = await post('https://hastebin.com/documents').send(err);
				embed.addField('📤 Output', `https://hastebin.com/${body.key}.js`);
				embed.setColor('RED');
			} else {
				embed.addField('📤 Output', '```js\n' + err + '```');
				embed.setColor('RED');
			}
			msg.edit(embed);
		}
	}
};
function clean(string) {
	if (typeof text === 'string') {
		return string
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203));
	} else {
		return string;
	}
}