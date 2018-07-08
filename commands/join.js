module.exports.help = {
    name: "join"
};

module.exports.run = (client, message, args) => {
    message.member.voiceChannel.join();
};
