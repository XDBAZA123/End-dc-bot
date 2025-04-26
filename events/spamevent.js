const { Events } = require('discord.js');

const userMessageMap = new Map();

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;

        const userId = message.author.id;

        let userMessages = userMessageMap.get(userId) || [];
        userMessages.push({ message, timestamp: Date.now() });
        userMessages = userMessages.filter(msg => Date.now() - msg.timestamp <= 5000);

        userMessageMap.set(userId, userMessages);

        if (userMessages.length > 10) {
            userMessages.forEach(({ message }) => {
                try {
                    message.delete();
                } catch (error) {
                    console.error(`Failed to delete spam message: ${error}`);
                }
            });

            userMessageMap.delete(userId);

            try {
                const warningMessage = await message.channel.send(
                    `<@${userId}>, you are spamming. Please slow down and don't spam.`
                );

                // Delete the warning message after 10 seconds
                setTimeout(() => {
                    try {
                        warningMessage.delete();
                    } catch (error) {
                        console.error(`Failed to delete warning message: ${error}`);
                    }
                }, 10000);
            } catch (error) {
                console.error(`Failed to send spam warning: ${error}`);
            }
        }
    },
};
