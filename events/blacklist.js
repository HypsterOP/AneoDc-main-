const client = require('../index');
const { BlacklistedWords } = require('../Collection');
client.on('message', async (message) => {
	if (!message.guild || message.author.id === client.user.id) return;

	const spliteedMsgs = message.content.split(' ');

	let deleting = false;
	await Promise.all(
		spliteedMsgs.map((content) => {
			if (BlacklistedWords.get(message.guild.id)?.includes(content.toLowerCase()))
				deleting = true;
		})
	);

	if (deleting) return message.delete();
});
