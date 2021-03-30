const canvacord = require("canvacord")
const Discord = require("discord.js")

module.exports = {
    name : 'spotify',
    aliases : ['spot' , 'sy'],
    description : 'Spotify',
    run : async(client, message, args) => {

  let user;

  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }

let status;
if (user.presence.activities.length === 1) status = user.presence.activities[0];
else if (user.presence.activities.length > 1) status = user.presence.activities[1];

if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
  return message.channel.send("This user is not listening to any music");
}

if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
  let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
      name = status.details,
      artist = status.state,
      album = status.assets.largeText;

const card = new canvacord.Spotify()
  .setAuthor(artist)
  .setAlbum(album)
  .setStartTimestamp(status.timestamps.start)
  .setEndTimestamp(status.timestamps.end)
  .setImage(image)
  .setTitle(name);

card.build()
  .then(buffer => {
      canvacord.write(buffer, "spotify.png");

      let attachment = new Discord.MessageAttachment(buffer, "spotify.png");
      return message.channel.send(attachment);
       })}
}
    }