/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const { version } = require('../../package.json');
const { mem, cpu } = require("node-os-utils");
const mongoose = require('mongoose');
let m = require("moment-duration-format"),
  os = require("os"),
  cpuStat = require("cpu-stat"),
  ms = require("ms"),
  moment = require("moment");
const version1 = require("discord.js").version;
module.exports = {
  name: "stats",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    cpuStat.usagePercent(async function (error, percent, seconds) {
      if (error) {
        return console.error(error);
      }
      const uptime = moment
        .duration(client.uptime)
        .format(`D [days] H [hrs] m [mins] s [seconds]`);
      const cores = os.cpus().length;
      const cpuModel = os.cpus()[0].model;
      const guilds = client.guilds.cache.size.toLocaleString();
      const users = client.users.cache.size.toLocaleString();
      const channels = client.channels.cache.size.toLocaleString();
      const usage = formatBytes(process.memoryUsage().heapUsed);
      const node = process.version;
      const CPU = percent.toFixed(2);
      const { totalMemMb, usedMemMb } = await mem.info();

      message.channel.send({
        content: `ℹ️About **${client.user.username}** | v${version}\`\`\`fix
Developer: HypsterOP#5687
Library: discord.js, version: ${Discord.version}
Servers: ${client.guilds.cache.size}
Users: ${client.users.cache.size}
Latest Reboot: ${uptime} ago
RAM: ${totalMemMb}MB
Total Commands: ${client.commands.size}
\`\`\`
      `,
      });
    });

    function formatBytes(a, b) {
      let c = 1024;
      d = b || 2;
      (e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]),
      (f = Math.floor(Math.log(a) / Math.log(c)));

      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
    }
  },
};
