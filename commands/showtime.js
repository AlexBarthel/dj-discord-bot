const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function randint(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function choose(arr) {
    return arr[randint(0, arr.length)];
}

function createList(a) {
    let t = "";
    a.forEach((b, i) => (t += `${b[0]}, `));
    t[t.length - 2] = ".";
    return t;
}

async function SignupCountdown(message, time) {
    message.edit({
        content: `If you'd like to participate in the DJ Show, you have **${time} seconds** to sign up!`,
    });

    time -= 5;

    if (time > 0) {
        setTimeout(() => {
            SignupCountdown(message, time);
        }, 5000);
    }
}

async function sleep(t) {
    await new Promise((s) => setTimeout(s, t));
}

const introductions = [
    "Hey there, welcome to the DJ Show! Get ready for a rollercoaster ride of fun, laughs, and surprises. I'm DJ, your host, and I'm here to make sure you have a blast!",
    "Yo, what's up party people! Buckle up for the DJ Express where we're taking you on a wild ride through entertainment town. I'm DJ, your virtual conductor, and tonight's gonna be lit!",
    "Hey hey! Ready to dial up the excitement? You're plugged into the DJ Show where we're about to rock your world with talk, laughter, and unexpected twists. I'm DJ, your guide to the coolest vibes!",
    "What's kickin', netizens! Time to strap in for a wild adventure on the DJ Show. I'm DJ, your cybernetic captain, navigating us through a journey of laughs and thrills!",
    "What's poppin', digital crew! Welcome to the DJ Show, where we're turning pixels into pure entertainment. I'm DJ, your virtual maestro, here to drop some serious fun!",
    "Hey everyone, ready for a tech-tastic journey? Join me, DJ, on the DJ Show as we explore laughs, mysteries, and all things cool!",
    "Hey guys, welcome aboard the DJ Show! I'm DJ, your virtual buddy, and tonight's gonna be epic with great chats and exciting guests!",
    "Hey everyone, it's party time on the DJ Show! I'm DJ, your virtual host, and tonight's lineup is guaranteed to keep you entertained and smiling!",
    "Hey, internet fam! Get ready for some awesome fun on the DJ Show! I'm DJ, your virtual buddy, and tonight's gonna be a blast with jokes, cool facts, and surprises!",
    "Hey everyone, welcome to the DJ Show, your ultimate hangout spot for digital fun! I'm DJ, your virtual buddy, and tonight, we're gonna have a blast with laughter, learning, and unexpected moments!",
];

const signup_remarks = [
    "signed up for the DJ Show!",
    "joined us for tonight's showing!",
    "felt like tagging along for the show!",
    "bought tickets to see the amazing DJ!",
    "have nothing better to do than watch the DJ Show!",
    "are HUGE fans of the DJ Show!",
    "will be participating at tonight's show!",
    "are hyped for an awesome night!",
];

const segments = [
    [
        "Name That GIF!",
        "In this segment, you will be shown a GIF from a popular movie, or TV show, and it's your job to guess what it's from!",
        ":DJ_name_that_gif:1219006056051511316",
        _name_that_gif,
    ],
    [
        "Name That GIF!",
        "In this segment, you will be shown a GIF from a popular movie, or TV show, and it's your job to guess what it's from!",
        ":DJ_name_that_gif:1219006056051511316",
        _name_that_gif,
    ],
    [
        "Name That GIF!",
        "In this segment, you will be shown a GIF from a popular movie, or TV show, and it's your job to guess what it's from!",
        ":DJ_name_that_gif:1219006056051511316",
        _name_that_gif,
    ],
    [
        "Name That GIF!",
        "In this segment, you will be shown a GIF from a popular movie, or TV show, and it's your job to guess what it's from!",
        ":DJ_name_that_gif:1219006056051511316",
        _name_that_gif,
    ],
    [
        "Name That GIF!",
        "In this segment, you will be shown a GIF from a popular movie, or TV show, and it's your job to guess what it's from!",
        ":DJ_name_that_gif:1219006056051511316",
        _name_that_gif,
    ],
    [
        "Name That GIF!",
        "In this segment, you will be shown a GIF from a popular movie, or TV show, and it's your job to guess what it's from!",
        ":DJ_name_that_gif:1219006056051511316",
        _name_that_gif,
    ],
    [
        "Name That GIF!",
        "In this segment, you will be shown a GIF from a popular movie, or TV show, and it's your job to guess what it's from!",
        ":DJ_name_that_gif:1219006056051511316",
        _name_that_gif,
    ],
    [
        "Name That GIF!",
        "In this segment, you will be shown a GIF from a popular movie, or TV show, and it's your job to guess what it's from!",
        ":DJ_name_that_gif:1219006056051511316",
        _name_that_gif,
    ],
    // [
    //     "Name That Chip!",
    //     "In this segment, ",
    //     ":DJ_name_that_chip:1219005995473174529",
    //     _name_that_chip,
    // ],
    // [
    //     "Name That Car!",
    //     "In this segment, you will be shown a randomly chosen picture of a car, and asked to figure out what it is. First person to guess the car wins!",
    //     ":DJ_name_that_car:1219005994357493961",
    //     _name_that_car,
    // ],
    // [
    //     "Name That Animal!",
    //     "In this segment, ",
    //     ":DJ_name_that_animal:1219005993841856602",
    //     _name_that_animal,
    // ],
    // [
    //     "Pictogram",
    //     "In this segment, ",
    //     ":DJ_pictogram:1219005998594002954",
    //     _pictogram,
    // ],
    // [
    //     "Spontaneous Sales",
    //     "In this segment, ",
    //     ":DJ_spontaneous_sales:1219006057800794202",
    //     _spontaneous_sales,
    // ],
    // [
    //     "Bet You Didn't!",
    //     "In this segment, ",
    //     ":DJ_bet_you_didnt:1219005990180225094",
    //     _bet_you_didnt,
    // ],
    // [
    //     "Pixels Loading...",
    //     "In this segment, you will be shown an image that starts out pixelated, and slowly begins to form into something recognizable. The first hacker to figure out what the image is wins!",
    //     ":DJ_pixels_loading:1219006004428275722",
    //     _pixels_loading,
    // ],
    // [
    //     "Compliment Corner",
    //     "In this segment, a person participating in the talk show will be randomly selected. Then everyone else MUST fire an inconceivable amount of compliments their way.",
    //     ":DJ_compliment_corner:1219005992021393569",
    //     _compliment_corner,
    // ],
    // [
    //     "Blake or Fake",
    //     "In this segment, you will be shown a snippet of text and it will be your job to determine if it was written by Blake, or an AI!",
    //     ":DJ_blake_or_fake:1219005991119622214",
    //     _blake_or_fake,
    // ],
    // [
    //     "Quick Draw!",
    //     "In this segment, you will receive a randomly generated prompt, then you will have 60 seconds to draw using any sort of digital program or piece of paper. When the time is up, show your picture to everyone and let the people vote!",
    //     ":DJ_quick_draw:1219006056643039283",
    //     _quick_draw,
    // ],
    // ["Hacker Court", "", ":DJ_hacker_court:1219005992973369465", _hacker_court],
    // [
    //     "Quote Of The Day",
    //     "",
    //     ":DJ_quote_of_the_day:1219006001336811581",
    //     _quote_of_the_day,
    // ],
];

const twists = [
    [
        "Wrong Answers Only",
        "You are expected to give the complete opposite of what is expected for the challenge.",
    ],
    ["Speed Round", "This segment will be twice as fast as it usually is."],
    [
        "Double Trouble",
        "Another (random) segment will happen along side this one, without a twist.",
    ],
];

module.exports = {
    execute: async (client, interaction) => {
        const channel = interaction.channel;

        const yes = new ButtonBuilder()
            .setCustomId("yes")
            .setLabel("Yes")
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(yes);

        let response = await interaction.reply({
            content: "Are you sure you want to start Showtime?",
            components: [row],
        });

        try {
            let collector = await response.awaitMessageComponent({
                filter: (i) => i.user.id === interaction.user.id,
                time: 60_000,
            });

            if (collector.customId === "yes") {
                // Create an object for the show
                let show = {
                    segments: [],
                    participants: [],
                };

                await interaction.editReply({
                    content: `# It's Showtime!\n${choose(introductions)}`,
                    components: [],
                });

                show.segments = chooseSegments();
                let formattedSegments = createList(show.segments);

                await sleep(5000);

                await channel.send({
                    embeds: [
                        {
                            id: 652627557,
                            description: `This show will have **${show.segments.length}** segments: ${formattedSegments}`,
                            color: 2326507,
                            fields: [],
                        },
                    ],
                });

                await sleep(5000);

                const signup = new ButtonBuilder()
                    .setCustomId("signup")
                    .setLabel("Sign Up")
                    .setStyle(ButtonStyle.Success);

                const row = new ActionRowBuilder().addComponents(signup);

                let response = await channel.send({
                    content: `If you'd like to participate in Showtime, you have **30 seconds** to sign up!`,
                    components: [row],
                });

                SignupCountdown(response, 30);

                let collector = await response.createMessageComponentCollector({
                    filter: (i) => {
                        show.participants.push(i.user.id);
                        i.reply({
                            content:
                                "Thanks for signing up! The show will begin shortly.",
                            ephemeral: true,
                        });
                    },
                    time: 30_000,
                });

                await sleep(30_000);

                if (show.participants.length < 1) {
                    await response.edit({
                        content: `Aww man, there were **${show.participants.length} people** signed up, but we need at least **1** to start. This show is cancelled, but you can restart it by running \`/talkshow\``,
                        components: [],
                    });
                    return;
                }

                await response.edit({
                    content: `Sign-ups are closed! Looks like **${
                        show.participants.length
                    } people** ${choose(signup_remarks)}`,
                    components: [],
                });

                show.segments.forEach(async (segment, index) => {
                    // Announce the segment
                    let nth =
                        index === 0
                            ? "first"
                            : index === show.segments.length - 1
                            ? "final"
                            : "next";
                    await channel.send({
                        content: `The ${nth} segment is... ***${segment[0]}*** <${segment[2]}>`,
                        embeds: [
                            {
                                id: 652627557,
                                description: segment[1],
                                color: 2326507,
                                fields: [],
                            },
                        ],
                    });

                    await sleep(3000);

                    await segment[3](client, channel);
                });
            }
        } catch (e) {
            await interaction.editReply({
                content: `This show was cancelled, but you can restart it by running \`/showtime\`\nDebug: || ${e} ||`,
                components: [],
            });
        }
    },
};

function chooseSegments() {
    // Create a temporary segments array
    let a = segments;
    // Pick a random number of segments from 5-8
    let b = randint(1, 1),
        c = [];
    for (let i = 0; i < b; i++) {
        // Choose a random segment
        let d = choose(a);
        // Add the segment to the show
        c.push(d);
        // Prevents repeating segments
        a.splice(a.indexOf(d), 1);
    }
    return c;
}

async function _name_that_gif(client, channel) {
    const GIFs = [
        [
            "Cars",
            "https://media.tenor.com/FfimHvu74ccAAAAM/kachow-backdriving-blink-mcqueen-cars-last-race.gif",
        ],
        [
            "The Greatest Showman",
            "https://media.tenor.com/IlaZguNNYNEAAAAM/hugh-jack-man-wear-the-hat.gif",
        ],
    ];

    const doubts = [
        "Thats not it...",
        "Not quite.",
        "Getting closer!",
        "Try again :D",
        "Hmm... I don't think so!",
        "Something else...",
        "Think harder!",
        "\*buzzer\* *wrong!*"
    ]

    let gif = choose(GIFs);

    await channel.send(gif[1]);
    await channel.send(
        "You have **15 seconds** to guess what movie/TV show this GIF is from!"
    );

    let collector = await response.createMessageComponentCollector({
        filter: (i) => {
            if (i.content.includes(gif[0])) {
                i.reply({
                    content: `@${i.user.id} is correct! The movie was ${gif[0]}`
                });
            } else {
                i.reply({
                    content: choose(doubts),
                    ephemeral: true
                });
            }
        },
        time: 15_000,
    });

    await sleep(15_000);
}
