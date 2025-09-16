module.exports = {
    execute: async (client, interaction) => {
        const message = interaction.options.getString("message");
        await interaction.reply(message);
    },
};
