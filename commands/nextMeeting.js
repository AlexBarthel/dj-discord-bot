function getUnixTimestamp() {
    const nextFriday = new Date();
    nextFriday.setDate(
        nextFriday.getDate() + ((5 - nextFriday.getDay() + 7) % 7)
    );
    nextFriday.setHours(16, 0, 0, 0); // Set to 4:00 PM CST
    return `<t:${Math.floor(nextFriday.getTime() / 1000)}:f>`;
}

module.exports = {
    execute: async (client, interaction) => {
        await interaction.reply(
            `The next meeting is ${getUnixTimestamp()} on [Zoom](https://zoom.memphishack.com)!`
        );
    },
};
