module.exports = {
    execute: async (client, interaction) => {
        await interaction.reply(
            `A fully copy of our Code of Conduct can be found here: <https://hackclub.com/conduct/>`
        );
    },
};
