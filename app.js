const Discord = require("discord.js");
const config = require('../config.js');

const client = new Discord.Client();

client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});

client.on('message', function (msg) {
    if (msg.channel.name === 'shitty_bots') {

        switch (msg.content) {
            case 'top':
                msg.channel.send('kek');
                break;
            case 'amen join':
                msg.member.voiceChannel.join();
                break;
        }
    }
});
client.login(config.token);
