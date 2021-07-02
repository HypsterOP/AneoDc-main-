const { MessageEmbed } = require("discord.js");

let mainColor = "#fff000"
let failColor = "0xeb3452";
let successColor = "0x34eb86";

module.exports = (type, description, ...otherArgs) => {
  const embed = new MessageEmbed()
    .setColor(
      mainColor
      //   type === "success"
      //     ? successColor
      //     : type === "fail"
      //     ? failColor
      //     : type === "main"
      //     ? mainColor
      //     : null
    )
    .setDescription(
      `${
        type === "success"
          ? "<:yes_tick:860411703607296001>"
          : type === "fail"
          ? "<:no:860411707242840064>"
          : ""
      } ${description}`
    );
  if (typeof otherArgs !== "undefined") {
    if (typeof otherArgs[0] === "object") {
      let user = otherArgs[0];
      if (user.username) {
        embed.setAuthor(
          user.username,
          user.displayAvatarURL({ dynamic: true })
        );
      }
    }
    if (typeof otherArgs[1] === "string") {
      embed.setFooter(otherArgs[1]);
    }
    return embed;
  }
};