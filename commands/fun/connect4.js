const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'connect4',
	aliases: ['4connect'],
	category: 'games',
	description: 'start an amazing connect 4 game!',
	run: async (client, message, args) => {
		const opponent =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]);
		const challenger = message.member;
		if (!opponent || opponent.id === message.author.id)
			return message.channel.send(
				'Please mention someone that you would like to challenge!'
			);

		const msg = await message.channel.send(
			`Hey ${opponent.displayName}, ${challenger} has challenged you to a battle in Connect Four. Do you accept?`
		);

		await Promise.all([msg.react('✅'), msg.react('❌')]);

		const filter = (reaction, user) =>
			user.id === opponent.id && ['✅', '❌'].includes(reaction.emoji.name);

		const challengeCheck = await msg.awaitReactions(filter, {
			time: 30000,
			max: 1
		});

		if (challengeCheck.size < 1)
			return msg.edit(
				"Looks like they didn't react in time, the challenge has been cancelled"
			);

		if (challengeCheck.first().emoji.name === '❌')
			return msg.edit(
				'Looks like they declined your challenge. Operation cancelled.'
			);
		else {
			await msg.delete();

			const board = [
				['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
				['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
				['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
				['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
				['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
				['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪']
			];

			const displayBoard = board => {
				let newBoard = '';
				for (const section of board) {
					newBoard += `${section.join('')}\n`;
				}
				newBoard = newBoard.concat('1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣');
				return newBoard;
			};

			const players = [
				{ id: challenger.id, member: challenger, color: '🔴', winColor: '🎉' },
				{ id: opponent.id, member: opponent, color: '🟡', winColor: '🎉' }
			];
			let player = 0;

			const embed = new MessageEmbed()
				.setAuthor(
					players[player].member.user.tag,
					players[player].member.user.displayAvatarURL({
						format: 'png',
						dynamic: true
					})
				)
				.setColor('BLURPLE')
				.setDescription(displayBoard(board))
				.setFooter(
					`🔴 ${challenger.user.tag}\n🟡 ${opponent.user.tag}`,
					players[player].member.user.displayAvatarURL({
						format: 'png',
						dynamic: true
					})
				);
			const game = await message.channel.send(
				`It is ${players[player].member}'s Turn! They are ${
					players[player].color
				}`,
				embed
			);

			await Promise.all([
				game.react('1️⃣'),
				game.react('2️⃣'),
				game.react('3️⃣'),
				game.react('4️⃣'),
				game.react('5️⃣'),
				game.react('6️⃣'),
				game.react('7️⃣')
			]);

			const gameFilter = (reaction, user) =>
				(user.id === opponent.id || user.id === challenger.id) &&
				['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'].includes(
					reaction.emoji.name
				);

			const collector = game.createReactionCollector(gameFilter);

			const checkWin = (a, b, c, d) =>
				a === b && b === c && c === d && a !== '⚪';

			const verticalCheck = () => {
				for (let j = 0; j < 7; j++) {
					for (let i = 0; i < 3; i++) {
						if (
							checkWin(
								board[i][j],
								board[i + 1][j],
								board[i + 2][j],
								board[i + 3][j]
							)
						)
							return {
								win: true,
								spots: [
									{ i, j },
									{ i: i + 1, j },
									{ i: i + 2, j },
									{ i: i + 3, j }
								]
							};
					}
				}
			};
			const horizontalCheck = () => {
				for (let i = 0; i < 6; i++) {
					for (let j = 0; j < 4; j++) {
						if (
							checkWin(
								board[i][j],
								board[i][j + 1],
								board[i][j + 2],
								board[i][j + 3]
							)
						)
							return {
								win: true,
								spots: [
									{ i, j },
									{ i, j: j + 1 },
									{ i, j: j + 2 },
									{ i, j: j + 3 }
								]
							};
					}
				}
			};
			const diagonalCheck1 = () => {
				for (let col = 0; col < 4; col++) {
					for (let row = 0; row < 3; row++) {
						if (
							checkWin(
								board[row][col],
								board[row + 1][col + 1],
								board[row + 2][col + 2],
								board[row + 3][col + 3]
							)
						)
							return {
								win: true,
								spots: [
									{ i: row, j: col },
									{ i: row + 1, j: col + 1 },
									{ i: row + 2, j: col + 2 },
									{ i: row + 3, j: col + 3 }
								]
							};
					}
				}
			};
			const diagonalCheck2 = () => {
				for (let col = 0; col < 4; col++) {
					for (let row = 5; row > 2; row--) {
						if (
							checkWin(
								board[row][col],
								board[row - 1][col + 1],
								board[row - 2][col + 2],
								board[row - 3][col + 3]
							)
						)
							return {
								win: true,
								spots: [
									{ i: row, j: col },
									{ i: row - 1, j: col + 1 },
									{ i: row - 2, j: col + 2 },
									{ i: row - 3, j: col + 3 }
								]
							};
					}
				}
			};
			const drawCheck = () => {
				let full = [];
				for (let i = 0; i < 6; i++) {
					for (let j = 0; j < 7; j++) {
						if (board[i][j] !== '⚪') {
							full.push(board[i][j]);
						}
					}
				}
				if (full.length == 42) {
					return true;
				}
			};

			collector.on('collect', async (reaction, user) => {
				if (user.id === players[player].id) {
					let space = [];
					switch (reaction.emoji.name) {
						case '1️⃣':
							for (let i = 5; i > -1; i--) {
								if (board[i][0] === '⚪') space.push({ i, j: 0 });
							}
							if (space.length > 0)
								board[space[0].i][space[0].j] = players[player].color;
							else
								return message.reply(
									'that column is already filled, please try a different one.'
								);
							break;
						case '2️⃣':
							for (let i = 5; i > -1; i--) {
								if (board[i][1] === '⚪') space.push({ i, j: 1 });
							}
							if (space.length > 0)
								board[space[0].i][space[0].j] = players[player].color;
							else
								return message.reply(
									'that column is already filled, please try a different one.'
								);

							break;
						case '3️⃣':
							for (let i = 5; i > -1; i--) {
								if (board[i][2] === '⚪') space.push({ i, j: 2 });
							}
							if (space.length > 0)
								board[space[0].i][space[0].j] = players[player].color;
							else
								return message.reply(
									'that column is already filled, please try a different one.'
								);
							break;
						case '4️⃣':
							for (let i = 5; i > -1; i--) {
								if (board[i][3] === '⚪') space.push({ i, j: 3 });
							}
							if (space.length > 0)
								board[space[0].i][space[0].j] = players[player].color;
							else
								return message.reply(
									'that column is already filled, please try a different one.'
								);
							break;
						case '5️⃣':
							for (let i = 5; i > -1; i--) {
								if (board[i][4] === '⚪') space.push({ i, j: 4 });
							}
							if (space.length > 0)
								board[space[0].i][space[0].j] = players[player].color;
							else
								return message.reply(
									'that column is already filled, please try a different one.'
								);
							break;
						case '6️⃣':
							for (let i = 5; i > -1; i--) {
								if (board[i][5] === '⚪') space.push({ i, j: 5 });
							}
							if (space.length > 0)
								board[space[0].i][space[0].j] = players[player].color;
							else
								return message.reply(
									'that column is already filled, please try a different one.'
								);
							break;
						case '7️⃣':
							for (let i = 5; i > -1; i--) {
								if (board[i][6] === '⚪') space.push({ i, j: 6 });
							}
							if (space.length > 0)
								board[space[0].i][space[0].j] = players[player].color;
							else
								return message.reply(
									'that column is already filled, please try a different one.'
								);
							break;
					}

					const winChecks = [
						verticalCheck,
						horizontalCheck,
						diagonalCheck1,
						diagonalCheck2
					];

					if (drawCheck()) {
						const draw = new MessageEmbed()
							.setAuthor(
								players[player].member.user.tag,
								players[player].member.user.displayAvatarURL({ format: 'png' })
							)
							.setColor(`YELLOW`)
							.setDescription(displayBoard(board))
							.setFooter(
								`🔴 ${challenger.user.tag}\n🟡 ${opponent.user.tag}`,
								players[player].member.user.displayAvatarURL({
									format: 'png',
									dynamic: true
								})
							);
						game.edit('It was a tie game!', draw);
						return collector.stop();
					}

					for (const func of winChecks) {
						const executed = func();
						if (executed && executed.win) {
							for (const spot of executed.spots) {
								board[spot.i][spot.j] = players[player].winColor;
							}

							const WIN = new MessageEmbed()
								.setAuthor(
									players[player].member.user.tag,
									players[player].member.user.displayAvatarURL({
										format: 'png'
									})
								)
								.setColor('BLURPLE')
								.setDescription(displayBoard(board))
								.setFooter(
									`🔴 ${challenger.user.tag}\n🟡 ${opponent.user.tag}`,
									players[player].member.user.displayAvatarURL({
										format: 'png',
										dynamic: true
									})
								);
							game.edit(`🎉 ${players[player].member} won!`, WIN);
							return collector.stop();
						}
					}
					player = (player + 1) % players.length;

					const edit = new MessageEmbed()
						.setAuthor(
							players[player].member.user.tag,
							players[player].member.user.displayAvatarURL({
								format: 'png',
								dynamic: true
							})
						)
						.setColor('BLURPLE')
						.setDescription(displayBoard(board))
						.setFooter(
							`🔴 ${challenger.user.tag}\n🟡 ${opponent.user.tag}`,
							players[player].member.user.displayAvatarURL({ format: 'png' })
						);
					game.edit(
						`It is ${players[player].member}'s Turn! They are ${
							players[player].color
						}`,
						edit
					);
				}
			});
		}
	}
};