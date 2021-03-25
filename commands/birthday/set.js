const { Client, Message, MessageEmbed } = require('discord.js');
const  Schema = require('../../models/birthday');
module.exports = {
    name: 'set-birthday',
    description: 'This command helps you in setting your birthday date!',
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async (client, message, args) => {
        const months = {
            1: "January",
            2: "February",
            3: "March",
            4: "Apirl",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        };

        const joined = args.join(" ");
        const split = joined.trim().split("/");

        let [day, month] = split;
        if (!day) return message.reply('Please specify a date! Ex- *set 6/11');
        if (!month) return message.reply('Please specify a month! Ex- *set 6/11');

        if (isNaN(day) || isNaN(month)) return message.reply('Please specify a valid number! Ex- *set 5/12');

        day = parseInt(day);
        month = parseInt(month);

        // 1 - 31
        // 1 - 12
        if (!day || day > 31) return message.reply('Please specify a date within 31! Ex- *set 5/12');
        if (!month || month > 12) return message.reply('Please specify a month within 12! Ex- *set 5/12');

        // 1 -> 1st
        // 2 -> 2nd
        const convertedDay = suffixes(day);
        const convertedMonth = months[month];
        const BirthdayString = `${convertedDay} of ${convertedMonth}`
        Schema.findOne({ User: message.author.id }, async(err, data) => {
            if(data) {
                data.Birthday = BirthdayString;
                data.save();
            } else {
                new Schema({ 
                    User: message.author.id,
                    Birthday: BirthdayString,
                }).save();
            }
        })
        message.reply(`${BirthdayString} has been set as your bithday Date!`)

    }
};
/** 
* @param {Number} number 
*/
function suffixes(number) {
    const converted = number.toString();

    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1"
     ? `${converted}st`
     : lastChar == "2" 
     ? `${converted}nd` 
     : lastChar == "3"
     ? `${converted}rd` 
     : `${converted}th`;
}