const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'hack',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */



 run: async(client, message, args) => {

        function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }

        const taggedUser = message.mentions.users.first();
        if (taggedUser.bot) {
            return message.channel.send('I cannot hack my fellow friends :cry:');
        }
        message.channel.send(`Hacking  ${taggedUser}...`);
        message.channel.send('Status: 0%')
        .then(msg => {
            wait(93);
            msg.edit('Status: 7%');
            wait(100);
            msg.edit('Status: 8%');
            wait(20)
            msg.edit('Status: 9%');
            wait(90);
            msg.edit('Status: 12%');
            wait(60);
            msg.edit('Status: 14%');
            wait(60);
            msg.edit('Status: 17%');
            wait(40);
            msg.edit('Status: 20%');
            wait(10);
            msg.edit('Status: 21%');
            wait(12);
            msg.edit('Status: 22%');
            wait(13);
            msg.edit('Status: 24%');
            wait(80);
            msg.edit('Status: 29%');
            wait(80);
            msg.edit('Status: 31%');
            wait(80);
            msg.edit('Status: 36%');
            wait(40);
            msg.edit('Status: 41%');
            wait(60);
            msg.edit('Status: 47%');
            wait(50);
            msg.edit('Status: 53%');
            wait(35);
            msg.edit('Status: 58%');
            wait(80);
            msg.edit('Status: 66%');
            wait(60);
            msg.edit('Status: 74%');
            wait(20);
            msg.edit('Status: 79%');
            wait(83);
            msg.edit('Status: 80%');
            wait(50);
            msg.edit('Status: 85%');
            wait(14);
            msg.edit('Status: 93%');
            wait(70);
            msg.edit('Status: 97%');
            wait(90);
            msg.edit('Status: 100%').then(() => {
                message.channel.send(`Succesfuly hacked ${taggedUser}.\n**I just sent you a code to your DM with his IP and the password to remotly control his computer, this is just a joke, do not take it seriously.**`);

                const pass = [
                  "zaegqyfsvfaaduyy",
                  "wsnrbzmeyntncucw",
                  "yccwebghdewtysuq",
                  "qdyuaeupgmybxyps",
                  taggedUser+"69143@p"
                ];

                const ips = [
                 "172.132.134.179",
                  "216.104.69.173",
                "160.83.85.164",
                "226.190.160.244",
                "161.37.175.4",
                "232.98.229.240",
                "62.119.233.214",
                "62.119.233.214",
                "39.226.149.79",
                "107.241.214.138"
                ]

                const pas = pass[Math.floor(Math.random() * pass.length)];
                const ip = ips[Math.floor(Math.random() * ips.length)];
                message.member.send(`IP: ${ip} : Password: ${pas} `)
            })
        })
    },
}