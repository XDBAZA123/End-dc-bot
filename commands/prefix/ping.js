module.exports = {
    name: "ping", // The name for the command, used to invoke it
    description: "Replies with Pong!", // Description of the command
    execute(message, args, client) {
      // Ensure the prefix is handled in your main bot file (command handler)
      try {
        message.reply("Pong!"); // Send "Pong!" as a reply
      } catch (error) {
        console.error("Error executing the ping command:", error);
        message.reply("There was an error while executing this command.");
      }
    },
  };
  