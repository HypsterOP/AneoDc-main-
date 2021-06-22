const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'spin',
    aliases: ['spi'],
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	    const user = message.mentions.members.first() || message.member;
let avatarURL = (size, format, dynamic) => {
      return user.user.avatarURL({
        size: size === "Direct" ? 1024 : size,
        format,
        dynamic
      });
    };
    let Canvas = require("canvas"),
      GIFEncoder = require("gif-encoder-2");
    let image = await Canvas.loadImage(avatarURL(512, "png", false));
    const width = 512,
      height = 512,
      numAngles = 50;
    const canvas = Canvas.createCanvas(width, height);

    const ctx = canvas.getContext("2d");

    ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
    ctx.clip();

    const encoder = new GIFEncoder(width, width);
    encoder.setTransparent(0x402814);

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(15);

    const centerX = width / 2;
    const centerY = height / 2;

    ctx.drawImage(image, 0, 0, width, height);

    for (let i = 0; i <= numAngles; i++) {
      encoder.addFrame(ctx);

      ctx.translate(centerX, centerY);

      ctx.rotate((Math.PI * 2) / numAngles);

      ctx.translate(-centerX, -centerY);

      const imageData = ctx.getImageData(0, 0, width, width);

      for (let j = 0; j < imageData.data.length; j += 4) {
        imageData.data[j] = 64;
        imageData.data[j + 1] = 40;
        imageData.data[j + 2] = 20;
        imageData.data[j + 3] = 0;
      }

      ctx.putImageData(imageData, 0, 0);

      ctx.drawImage(image, 0, 0, width, height);
    }

    encoder.finish();

    return message.channel.send({
      files: [
        {
          attachment: encoder.out.getData(),
          name: "spin.gif"
        }
      ]
})
    }
}