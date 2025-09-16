const express = require("express");
const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    EmbedBuilder,
    Events
} = require("discord.js");

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore/lite");

const firebaseConfig = {
    projectId: "memphis-hackclub"
};

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);

const commands = {
    "say": require("./commands/say"),
    "generate": require("./commands/generate"),
    "coc": require("./commands/coc"),
    "change-status": require("./commands/changeStatus"),
    "next-meeting": require("./commands/nextMeeting"),
    "showtime": require("./commands/showtime"),
    "submit": require("./commands/submit")
};

const BOT_TOKEN = "MTA4MDE1NzE1NjM5MDc1MjMxNw.GjKLaO.Uj8RQYtGenrpMigenJInh_-Zp2zjmOk7E3BJBI";
const CLIENT_ID = "1080157156390752317";

const app = express();
const PORT = 8000;
app.listen(PORT, () => console.log(`[ NODE ] Running on port ${PORT}`));

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

const REST_COMMANDS = [
    {
        name: "generate",
        description: "Generate text and images using AI.",
        options: [
            {
                name: "type",
                description: "Please select the type of generation.",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "text",
                        value: "text",
                    },
                    {
                        name: "image",
                        value: "image",
                    },
                ],
            },
            {
                name: "prompt",
                description: "Please enter a prompt.",
                type: 3,
                required: true,
            },
        ],
    }, // generate
    {
        name: "say",
        description: "Repeats what you said.",
        options: [
            {
                name: "message",
                description: "The words to repeat.",
                type: 3,
                required: true,
            },
        ],
    }, // say
    {
        name: "coc",
        description:
            "Provides you with a link to Memphis Hackclub's Code of Conduct",
    }, // coc
    {
        name: "ping",
        description: "How fast is the bot's reponse time?",
    }, // ping
    {
        name: "change-status",
        description: "Change the bot's status! (SFW/PG only!)",
        options: [
            {
                name: "status",
                description:
                    "The new status for the bot (online, idle, dnd, invisible)",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "Online",
                        value: "online",
                    },
                    {
                        name: "Idle",
                        value: "idle",
                    },
                    {
                        name: "Do Not Disturb",
                        value: "dnd",
                    },
                    {
                        name: "Invisible",
                        value: "invisible",
                    },
                ],
            },
            {
                name: "activity",
                description: "The activity/status for the bot.",
                type: 3,
                required: true,
            },
            {
                name: "type",
                description: "The activity type for the bot.",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "Playing",
                        value: "0",
                    },
                    {
                        name: "Streaming",
                        value: "1",
                    },
                    {
                        name: "Listening",
                        value: "2",
                    },
                    {
                        name: "Watching",
                        value: "3",
                    },
                    {
                        name: "Custom",
                        value: "4",
                    },
                    {
                        name: "Competing",
                        value: "5",
                    },
                ],
            },
        ],
    }, // change-status
    {
        name: "next-meeting",
        description:
            "Wondering when the next meeting/workshop is? Fear no more!",
    }, // next-meeting
    {
        name: "8ball",
        description: "Makes decisions for you",
        options: [
            {
                name: "question",
                description: "What do you want to ask me?",
                type: 3,
                required: true,
            },
        ],
    }, // 8ball
    {
        name: "rick",
        description: "Get it? Like rick roll? 😂",
    }, // rick
    {
        name: "birthday",
        description: "How long until MHC's birthday?",
    }, // birthday
    {
        name: "poll",
        description: "Create a poll",
        options: [
            {
                name: "question",
                description: "The question that needs answering.",
                type: 3,
                required: true,
            },
        ],
    }, // poll
    {
        name: "showtime",
        description: "It's showtime baby!",
    }, // talkshow
    {
        name: "help",
        description: "View a list of all the different bot commands!",
    }, // help
    {
        name: "submit",
        description: "Submit the project you made in a workshop in exchange for Hackpoints.",
        options: [
            {
                name: "repository",
                description: "The link to the Github repository that has your project.",
                type: 3,
                required: true,
            },
        ],
    }, // submit
];

const rest = new REST({
    version: "10",
}).setToken(BOT_TOKEN);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: REST_COMMANDS,
        });
        console.log("[ REST ] Loaded slash (/) commands");
    } catch (error) {
        console.error(error);
    }
})();

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function calculateNextMeeting(date = new Date()) {
    const today = new Date(date.getTime());
    const nextFriday = new Date(
        today.setDate(today.getDate() + ((7 - today.getDay() + 5) % 7 || 7))
    );
    const offset = nextFriday.getTimezoneOffset();
    const newDate = new Date(nextFriday.getTime() - offset * 60 * 1000);
    return newDate.toISOString().split("T")[0];
}

function calculateBirthday() {
    const birthday = new Date(
        `Nov 12, ${new Date().getFullYear()} 00:00:00`
    ).getTime();
    const now = new Date().getTime();
    const timeDiff = birthday - now;
    const seconds = Math.floor(timeDiff / 1000) % 60;
    const minutes = Math.floor(timeDiff / 1000 / 60) % 60;
    const hours = Math.floor(timeDiff / 1000 / 60 / 60) % 24;
    const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

function cmd_8ball() {
    let answers = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes, definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
    ];
    let answer = Math.floor(Math.random() * answers.length);
    return answers[answer];
}

client.once(Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await commands[interaction.commandName].execute(client, interaction, db);

    // if (interaction.commandName === "say") {
    // } else if (interaction.commandName === "generate") {
    // } else if (interaction.commandName === "coc") {
    //     const embed = new EmbedBuilder()
    //         .setColor(0xe55451)
    //         .setTitle("Code of Conduct")
    //         .setDescription(
    //             `A full copy of our Code of Conduct can be found here: https://hackclub.com/conduct/`
    //         )
    //         .setThumbnail(
    //             "https://cdn.discordapp.com/avatars/1080157156390752317/079b7ae9eab28e89e04c900d29b6bfd2.webp?size=128"
    //         )
    //         .setFooter({
    //             text: "- DJ 🎧",
    //             iconURL: "https://cdn.discordapp.com/avatars/1080157156390752317/079b7ae9eab28e89e04c900d29b6bfd2.webp?size=128",
    //         });
    //     await interaction.reply({
    //         embeds: [embed]
    //     });
    // } else if (interaction.commandName === "ping") {
    //     const ping = Date.now() - interaction.createdTimestamp;
    //     const embed = new EmbedBuilder()
    //         .setColor(0xe55451)
    //         .setTitle("Pong!")
    //         .setDescription(
    //             `@${interactionSender} has a ping of ${ping}ms. Bot API Latency is ${Math.round(
    //       client.ws.ping
    //     )}ms.`
    //         )
    //         .setThumbnail(
    //             "https://cdn.discordapp.com/avatars/1080157156390752317/079b7ae9eab28e89e04c900d29b6bfd2.webp?size=128"
    //         );

    //     const img =
    //         ping > 100 ?
    //         "https://us-tuna-sounds-images.voicemod.net/abd9ae5c-e408-4650-bb96-cbf6c729c8d3.jpg" :
    //         ping > 80 ?
    //         "https://i.ibb.co/Pr9Qbzv/average.png" :
    //         "https://media.tenor.com/jSsn0zyCwGYAAAAC/speed-i-am-speed.gif";

    //     embed.setImage(img);
    //     await interaction.reply({
    //         embeds: [embed]
    //     });
    // } else if (interaction.commandName === "change-status") {
    //     const status = interaction.options.getString("status");
    //     const activity = interaction.options.getString("activity");
    //     const type = interaction.options.getString("type");

    //     client.user.setStatus(status);
    //     client.user.setActivity({
    //         name: activity,
    //         type: parseInt(type),
    //     });

    //     const types = [
    //         "Playing",
    //         "Streaming",
    //         "Listening to",
    //         "Watching",
    //         "",
    //         "Competing in",
    //     ];
    //     await interaction.reply(
    //         `@${interactionSender} changed my status! 🤯 New Status is: ${
    //     types[parseInt(type)]
    //   } ${activity} - DJ🎧`
    //     );
    // } else if (interaction.commandName === "next-meeting") {
    //     await interaction.reply(
    //         `The next meeting is ${cmd_nextMeeting()} at 4:00pm on Zoom! (zoom.memphishack.com)`
    //     );
    // } else if (interaction.commandName === "8ball") {
    //     const question = interaction.options.getString("question");
    //     await interaction.reply(`"${question}" 🤔 ${cmd_8ball()}`);
    // } else if (interaction.commandName === "rick") {
    //     await interaction.reply(
    //         "https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif"
    //     );
    // } else if (interaction.commandName === "birthday") {
    //     const remaining = calculateBirthday();
    //     await interaction.reply(
    //         `MHC's Birthday is in ${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, and ${remaining.seconds} seconds. 🥳`
    //     );
    // } else if (interaction.commandName === "poll") {
    //     const question = interaction.options.getString("question");
    //     const embed = new EmbedBuilder()
    //         .setColor(0xe55451)
    //         .setTitle("Poll!")
    //         .setDescription(question)
    //         .setThumbnail(
    //             "https://cdn.discordapp.com/avatars/1080157156390752317/079b7ae9eab28e89e04c900d29b6bfd2.webp?size=128"
    //         )
    //         .setFooter({
    //             text: "- DJ 🎧",
    //             iconURL: "https://cdn.discordapp.com/avatars/1080157156390752317/079b7ae9eab28e89e04c900d29b6bfd2.webp?size=128",
    //         });

    //     const message = await interaction.reply({
    //         embeds: [embed],
    //         fetchReply: true,
    //     });
    //     message.react("955313286553956432");
    //     message.react("955314439236755457");
    // } else if (interaction.commandName === "insult") {
    //     const user = interaction.options.getString("user");
    //     interaction.reply(`${user}... ${cmd_insult()}`);
    // } else if (interaction.commandName === "help") {
    //     const embed = new EmbedBuilder()
    //         .setColor(0x0099ff)
    //         .setTitle("DJ (/help)")
    //         .setDescription(
    //             "Commands:\n/say <message>\n/coc\n/ping\n/change-status <status> <activity> <activityType>\n/next-meeting\n/birthday\n/poll <question>\n/help\n\n+ Some secret commands 😉"
    //         )
    //         .setThumbnail(
    //             "https://cdn.discordapp.com/avatars/1080157156390752317/079b7ae9eab28e89e04c900d29b6bfd2.webp?size=128"
    //         )
    //         .setFooter({
    //             text: "- DJ 🎧",
    //             iconURL: "https://cdn.discordapp.com/avatars/1080157156390752317/079b7ae9eab28e89e04c900d29b6bfd2.webp?size=128",
    //         });

    //     await interaction.reply({
    //         embeds: [embed],
    //         ephemeral: true
    //     });
    // }
});

client.login(BOT_TOKEN);
