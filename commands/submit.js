const request = require("request");
const { collection, getDocs, query, where, doc, updateDoc } = require("firebase/firestore/lite");

function randint(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function choose(arr) {
    return arr[randint(0, arr.length)];
}

const motivation = [
    "You submitted a project, nice work!",
    "Great stuff! Keep working hard.",
    "You're doing awesome so far.",
    "You deserve these hackpoints, I know it.",
    "Keep it up! You're getting better each time.",
    "Another project in the books, WOO!",
];

module.exports = {
    execute: async (client, interaction, db) => {
        const repository = interaction.options.getString("repository");
        const userId = interaction.user.id;
        const pointsToAdd = 100;

        const req = request.get({ url: repository }, async (err, res, body) => {
            if (err) {
                await interaction.reply({
                    content:
                        "I couldn't find your Github Repository, make sure that its visibility is set to Public.",
                    ephemeral: true
                });
                return;
            }

            if (res.statusCode === 200) {
                const guildCol = collection(db, "guilds");
                const guildQuery = query(guildCol, where("guildId", "==", interaction.guild.id));
                const guildSnapshot = await getDocs(guildQuery);

                if (guildSnapshot.empty) {
                    await interaction.reply({
                        content:
                            "This guild does not have permission to access memphis-hackclub.",
                        ephemeral: true
                    });
                    return;
                }

                const guildDoc = guildSnapshot.docs[0];
                const guildData = { id: guildDoc.id, ...guildDoc.data() };

                let userFound = false;
                let duplicateSubmission = false;
                const updatedUsers = guildData.users.map(user => {
                    if (user.userId === userId) {
                        userFound = true;

                        if (user.saveData.submissions.includes(repository)) {
                            duplicateSubmission = true;
                        } else {
                            user.saveData.points += pointsToAdd;
                            user.saveData.submissions.push(repository);
                        }
                    }
                    return user;
                });

                if (!userFound) {
                    updatedUsers.push({
                        userId: userId,
                        saveData: {
                            points: pointsToAdd,
                            submissions: [repository]
                        }
                    });
                }

                if (duplicateSubmission) {
                    await interaction.reply({
                        content: "You've already submitted this project.",
                        ephemeral: true
                    });
                    return;
                }

                const guildRef = doc(db, "guilds", guildDoc.id);
                await updateDoc(guildRef, { users: updatedUsers });

                await interaction.reply({
                    content: `<@${userId}> submitted a project!\n-# +${pointsToAdd} <:hp:1293417804267130890>`
                });
            } else {
                await interaction.reply({
                    content:
                        "I couldn't find your Github Repository, make sure that its visibility is set to Public.",
                    ephemeral: true,
                });
            }
        });
    },
};
