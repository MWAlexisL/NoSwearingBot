const fs = require('fs');

module.exports.run = member => {
    console.log('xdd');
    member.voiceChannel.join().then(connection => {
        const receiver = connection.createReceiver();
        connection.on('speaking', (user, speaking) => {
            if (speaking) {
                const audio = receiver.createPCMStream(user);
                const output = generateOutputFile(member.voiceChannel, member.user);
                audio.pipe(output);
//                 audio.on('end',() => {
//                     // Imports the Dialogflow library
//                     const dialogflow = require('dialogflow');
//                     const common = require('@google-cloud/common')
// // Instantiates a sessison client
//                     const sessionClient = new dialogflow.SessionsClient();
//
// // The path to identify the agent that owns the created intent.
//                     const sessionPath = sessionClient.sessionPath('no-swearing-bot', 'test');
//
// // Read the content of the audio file and send it as part of the request.
//                     const readFile = common.util.promisify(fs.readFile, {singular: true});
//                     readFile(output.path)
//                         .then(inputAudio => {
//                             // The audio query request
//                             const request = {
//                                 session: sessionPath,
//                                 queryInput: {
//                                     audioConfig: {
//                                         audioEncoding: 'pcm',
//                                         sampleRateHertz: sampleRateHertz,
//                                         languageCode: 'fr-FR',
//                                     },
//                                 },
//                                 inputAudio: inputAudio,
//                             };
//                             // Recognizes the speech in the audio and detects its intent.
//                             return sessionClient.detectIntent(request);
//                         })
//                         .then(responses => {
//                             console.log('Detected intent:');
//                             logQueryResult(sessionClient, responses[0].queryResult);
//                         })
//                         .catch(err => {
//                             console.error('ERROR:', err);
//                         });
//                 });
            }
        });
    });
};

function generateOutputFile(channel, member) {
    const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
   fs.createWriteStream(fileName);
    return fs.createWriteStream(fileName);
}
