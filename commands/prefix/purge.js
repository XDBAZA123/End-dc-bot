const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'Deletes a specified number of messages from the channel.',
    async execute(message, args) {
        try {
            // Check if the command is used in a guild
            if (!message.guild) {
                return message.reply('This command can only be used in a server.');
            }

            // Check if the user has the Manage Messages permission
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return message.reply('You do not have permission to manage messages.');
            }

            // Ensure the bot has the Manage Messages permission
            if (!message.guild.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return message.reply('I do not have permission to manage messages.');
            }

            // Parse the number of messages to delete from arguments
            const numMessages = parseInt(args[0], 10);

            // Validate the input
            if (!numMessages || isNaN(numMessages) || numMessages < 1 || numMessages > 100) {
                return message.reply('Please specify a number of messages to delete (1-100).');
            }

            // Fetch and delete the messages
            const fetchedMessages = await message.channel.messages.fetch({ limit: numMessages });
            await message.channel.bulkDelete(fetchedMessages, true);

            // Send a confirmation message
            const confirmationMessage = await message.channel.send(
                `✅ Successfully deleted ${fetchedMessages.size} messages.`
            );

            // Delete the confirmation message after a few seconds
            setTimeout(() => {
                confirmationMessage.delete().catch(console.error);
            }, 5000);
        } catch (error) {
            console.error('Error executing the purge command:', error);
            message.reply('There was an error trying to delete messages. Please try again.');
        }
    },
};
