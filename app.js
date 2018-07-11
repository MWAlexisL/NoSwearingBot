const Discord = require("discord.js");
const config = require('./config.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// reads all file in /commands & convert them as actual client commands
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);
    let jsFile = files.filter(f => f.split(".").pop() === "js");

    jsFile.forEach(file => {
        let props = require(`./commands/${file}`);
        client.commands.set(props.help.name, props);
    });
});
client.on('ready', () => {
    client.user.setActivity('gubs en train de dev', {type: "WATCHING"});
});

client.on('message', msg => {
    const messageArray = msg.content.split(" ");
    if (messageArray[0] !== config.prefix) return;

    const args = messageArray.slice(2);
    const command = client.commands.get(messageArray[1]);
    if (command) command.run(client, msg, args);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (newMember.user.bot) return;
    if (newMember.voiceChannelID === oldMember.voiceChannelID) return;
    if (newMember.voiceChannelID !== null) {
        console.log(oldMember.voiceChannelID);
        if (![null, undefined].includes(oldMember.voiceChannelID)) oldMember.voiceChannel.leave();
        const join = require('./scripts/join.js');
        join.run(newMember);
    } else {
        oldMember.voiceChannel.leave();
    }
});

client.login(config.token);
