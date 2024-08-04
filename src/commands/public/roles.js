// veriables
const {
    SlashCommandBuilder,
    EmbedBuilder,
    Client,
    ChatInputCommandInteraction,
} = require("discord.js");

// exporting the module
module.exports = {
    data: new SlashCommandBuilder()
        .setName("roles")
        .setDescription("Get server role list.")
        .setDMPermission(false),
    category: "public",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: async (client, interaction) => {
        const roles = interaction.guild.roles.cache.sort(
            (a, b) => b.position - a.position
        );
        const allRoles = roles.map((r) => r);
        const size = allRoles.length;

        if (size >= 151)
            return interaction.reply({
                content: `Too many roles to display. About [${
                    allRoles.size - 1
                }] roles.`,
                ephemeral: true,
            });

        const embed = new EmbedBuilder()
            .setAuthor({
                name: client.user.tag,
                iconURL: client.user.displayAvatarURL(),
            })
            .setTitle(`ALL ROLES OF THIS SERVER [${size}]`)
            .setColor(client.colors.androidGreen)
            .setDescription(`${allRoles.join("\n")}`)
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp();

        return interaction.reply({
            embeds: [embed],
        });
    },
};
