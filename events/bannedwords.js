const { PermissionsBitField, EmbedBuilder } = require('discord.js');

// List of banned words
const bannedWords = [ 'niger', '<@&${1132738644927582321}>', 'nigger', 'nihgger', 'kys', 'niggy', 'discord.gg/', 'https://discord.gg/', 'n i g g e r', 'nggas', 'n 1 g g e r', 'fag', 'n1g3r', 'nigga', 'n1g', 'faggot', 'f@g', 'faggy', 'fagy', 'paki', 'chink', 'chinkabella', 'doxx', 'ddos', 'doxxed', 'doxed', 'ddosed', 'dosed']; // Add your banned words here

// ID of the channel to send the embed to
const logChannelId = '1365637666607075339'; // Replace with your log channel ID

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        // Ignore messages from bots
        if (message.author.bot) return;

        // Check if the message contains any banned word
        const foundWord = bannedWords.find(word => 
            message.content.toLowerCase().includes(word.toLowerCase())
        );

        if (foundWord) {
            try {
                // Delete the message
                await message.delete();

                // Notify the user and channel
                const reply = await message.channel.send(
                    `${message.author}, this word is not allowed lol. Stop being a bad boy.`
                );

                // Delete the bot's reply after 10 seconds
                setTimeout(() => {
                    try {
                        reply.delete();
                    } catch (error) {
                        console.error('Error deleting the bot\'s reply:', error);
                    }
                }, 10000);

            } catch (error) {
                console.error('Error handling banned word:', error);
            }
        }
    },
};
