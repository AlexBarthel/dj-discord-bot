const types = [
    "Playing",
    "Streaming",
    "Listening to",
    "Watching",
    "" /* Custom status is unsupported */,
    "Competing in",
];

module.exports = {
    execute: async (client, interaction) => {
        const status = interaction.options.getString("status");
        const activity = interaction.options.getString("activity");
        const type = parseInt(interaction.options.getString("type"));

        client.user.setStatus(status);
        client.user.setActivity({
            name: activity,
            type: type,
        });

        await interaction.reply({
            content: `Changed status to: ${types[type]} **${activity}**`,
            ephemeral: true
        });
    },
};
