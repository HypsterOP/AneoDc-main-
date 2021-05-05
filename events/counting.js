const client = require('../index');
const db = require('../models/Guild');
const user = require('../models/User');

client.on('message', async (message) => {
	const data = await db.findOne({ id: message.guild.id });

	if (!data) return;

	if (message.channel.id !== data.Channel) return;

	if (parseInt(message.content) === data.Current + 1) {
		// checking if its right number
		user.findOne(
			{ id: message.author.id, Guild: message.guild.id },
			async (err, data) => {
				if (err) throw err;
				if (data) {
					data.Counts++;
				} else {
					data = new user({
						id: message.author.id,
						Guild: message.guild.id,
						Counts: 1,
					});
				}
				data.save();
			}
		);
	} else message.delete();

	data.Current = parseInt(message.content);
	data.save();
});
