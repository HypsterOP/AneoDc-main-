const Distube = require("distube");
const { MessageEmbed } = require("discord.js");
module.exports = (client) => {

  client.distube = new Distube(client, {
    searchSongs: false,
    emitNewSongOnly: false,
    highWaterMark: 1024*1024*64,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    youtubeCookie: "VISITOR_INFO1_LIVE=UhgZMhuTk_I; CONSENT=WP.28fc8a; PREF=tz=Asia.Calcutta&f4=4000000; GPS=1; YSC=D--E2fxu6WI; SID=-AeUMBElNhpqOmcu6895HJ76ntRYkx0AL_2Cd2xLefa9Vv2VOcibxcIzJydmuGyXIlrLhA.; __Secure-3PSID=-AeUMBElNhpqOmcu6895HJ76ntRYkx0AL_2Cd2xLefa9Vv2VLtsGLFO7XXOMHWAkfZU58A.; HSID=AjXWMgI7VaMOBGEMe; SSID=A8uCfPozaRfHrB8Rv; APISID=Ipn73aZ9Rt1x1jXG/AjcI2M8-_3bZdv37s; SAPISID=5dhC2RgJHXO4JcOW/AOb82uy1lEYXLM7qQ; __Secure-3PAPISID=5dhC2RgJHXO4JcOW/AOb82uy1lEYXLM7qQ; LOGIN_INFO=AFmmF2swRQIhANMJ-3Bpm20CIY4CdydiHPrqbBnhyJupuPd-Pz3jc9rQAiA2VQ2NcySCoLw3XOOKZN74uswwHPNnvwC6h_PJkQPTbA:QUQ3MjNmejE2blRrczU3VjN0S1N6RFF1ZVR2YVFOU0h3VnNIYVRqMWpXYWE1aEtOTk1mRS04YTBHZlpwMGNDZEthVUZGcUYyclVaNWFjaF95M0F1ZlBXVFRqX0MzWW52SXZicWJ4d1dmXzJCNURqTmZER0oyR3RIRnBxMzRwbm9zX2NqMGdoNS1VNG5IS2pkTVdmRnZ2cnBKNlcyNE9TeVNqaVR4RUJhUWtYT2pJOVBhb24tckpR; SIDCC=AJi4QfFhTi8UVHfpYzyq2tlu-xsYnmrDC8CI3YQu0lGptrbL62gqDsTQa0A_csR-HjNwiA-l; __Secure-3PSIDCC=AJi4QfGZR-Hp99_wX3K7_u204Fh9afHxqij4BlT5qqhz-Gk0ZHmioBgwhSh7XeRfXCS2MNdy",
    youtubeDL: true,
    updateYouTubeDL: true,
    customFilters: {
      "clear": "dynaudnorm=f=200",
      "lowbass": "bass=g=6,dynaudnorm=f=200",
      "bassboost": "bass=g=20,dynaudnorm=f=200",
      "purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
      "8D": "apulsator=hz=0.08",
      "vaporwave": "aresample=48000,asetrate=48000*0.8",
      "nightcore": "aresample=48000,asetrate=48000*1.25",
      "phaser": "aphaser=in_gain=0.4",
      "tremolo": "tremolo",
      "vibrato": "vibrato=f=6.5",
      "reverse": "areverse",
      "treble": "treble=g=5",
      "normalizer": "dynaudnorm=f=200",
      "surrounding": "surround",
      "pulsator": "apulsator=hz=1",
      "subboost": "asubboost",
      "karaoke": "stereotools=mlev=0.03",
      "flanger": "flanger",
      "gate": "agate",
      "haas": "haas",
      "mcompand": "mcompand"
    }

  })

  // Queue status template
  const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

  // DisTube event listeners, more in the documentation page
  client.distube
      .on("playSong", (message, queue, song) => message.channel.send(new MessageEmbed()
        .setTitle("Playing :notes: " + song.name)
        .setURL(song.url)
        .setColor('RANDOM')
        .addField("Duration", `\`${song.formattedDuration}\``)
        .addField("Queue status", status(queue))
        .setThumbnail(song.thumbnail)
        .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed()
          .setTitle("Added :thumbsup: " + song.name)
          .setURL(song.url)
          .setColor(`RANDOM`)
          .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${queue.duration*1000}\``)
          .addField("Duration", `\`${song.formattedDuration}\``)
          .setThumbnail(song.thumbnail)
          .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed()
            .setTitle("Playing Playlist :notes: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor(`RANDOM`)
            .addField("Current Track: ", `[${song.name}](${song.url})`)
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${queue.duration*1000}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({dynamic: true}))
        )
      )
      .on("addList", (message, queue, playlist) => message.channel.send(new MessageEmbed()
            .setTitle("Added Playlist :thumbsup: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
            .setURL(playlist.url)
            .setColor(`RANDOM`)
            .addField("Duration", `\`${playlist.formattedDuration}\``)
            .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${queue.duration*1000}\``)
            .setThumbnail(playlist.thumbnail.url)
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        )
      )
      .on("searchResult", (message, result) =>
          message.channel.send(new MessageEmbed()
                  .setTitle("**Choose an option from below**")
                  .setURL(song.url)
                  .setColor(`RANDOM`)
                  .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
                  .setFooter(`Aneo | Music`, client.user.displayAvatarURL())
          )
      )
      .on("searchCancel", (message) => message.channel.send(new MessageEmbed()
          .setColor('RANDOM')
          .setFooter(`Aneo | Music`, client.user.displayAvatarURL())
          .setTitle(`✖ | Search Cancelled`)
        )
      )
      .on("error", (message, e) => {
          console.log(String(e.stack).bgRed)
          message.channel.send(new MessageEmbed()
              .setColor(`RANDOM`)
              .setFooter(`Aneo | Music`, client.user.displayAvatarURL())
              .setTitle(`✖ | An error occurred`)
              .setDescription(`\`\`\`${e.stack}\`\`\``)
          )
      })
      .on("initQueue", queue => {
          queue.autoplay = false;
          queue.volume = 75;
          queue.filter = "lowbass";
      }
    )

}