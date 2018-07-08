const Discord = require("discord.js");
const config = require('./config.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);
    let jsFile = files.filter(f => f.split(".").pop() === "js");

    jsFile.forEach(file => {
        let props = require(`./commands/${file}`);
        client.commands.set(props.help.name, props);
    });
});

client.on('ready', () => {
    console.log("Logged in as " + client.user.tag + "!");
});

client.on('message', msg => {
    const messageArray = msg.content.split(" ");
    if (messageArray[0] !== config.prefix) return;

    const args = messageArray.slice(2);
    const command = client.commands.get(messageArray[1]);
    command.run(client, msg, args);
});

client.login(config.token);
