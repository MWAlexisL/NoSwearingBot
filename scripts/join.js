const fs = require('fs');

module.exports.run = member => {
    console.log('xdd');
    member.voiceChannel.join().then(connection => {
        const receiver = connection.createReceiver();
        connection.on('speaking', (user, speaking) => {
           if (speaking) {
               // console.log(user);
               const audio = receiver.createPCMStream(user);
               // const output = generateOutputFile(member.voiceChannel, member.user);
               // audio.pipe(output);
               // console.log(output)
           }
        });
    });
};

function generateOutputFile(channel, member) {
    const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
    return fs.createWriteStream(fileName);
}
