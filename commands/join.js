module.exports.help = {
    name: "join"
};

module.exports.run = (client, member, args) => {
    member.voiceChannel.join();
};
