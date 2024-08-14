const { Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "purge.after",
    subCommand: true,
    category: "moderation",
    usage: "/purge after [message]",
    botPermissions: ["ManageMessages"],
    userPermissions: ["ManageMessages"],
    cooldown: 10,
    /**
     *
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    execute: async (client, interaction) => {
        try {
            const messageLink = interaction.options.getString("message");
            const fetchedMessages = await interaction.channel.messages.fetch();
            const fetchedMessage = fetchedMessages.get(
                messageLink.split("/").pop()
            );
            const messagesToDelete = [];

            fetchedMessages.filter(async (message) => {
                if (message.interaction?.id == interaction.id) return;
                if (
                    fetchedMessage &&
                    message.createdTimestamp >= fetchedMessage.createdTimestamp
                )
                    return messagesToDelete.push(message);
            });

            const deletedMessages = await interaction.channel.bulkDelete(
                messagesToDelete,
                true
            );

            interaction.reply({
                content: `\`\`\`m\n${deletedMessages.size} ${
                    deletedMessages.size <= 1 ? "message has" : "messages have"
                } been deleted.\n\`\`\``,
                ephemeral: true,
            });
        } catch (error) {
            throw error;
        }
    },
};
