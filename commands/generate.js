const { Groq } = require("groq-sdk");

const groq = new Groq({
    apiKey: "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",
});

module.exports = {
    execute: async (client, interaction) => {
        const type = interaction.options.getString("type");
        const prompt = interaction.options.getString("prompt");

        await interaction.reply({
            embeds: [
                {
                    author: {
                        name: prompt,
                    },
                    description: "<a:loadingalt:1373144760189194361>",
                    color: 15480656,
                },
            ],
        });

        if (type === "text") {
            try {
                const response = await groq.chat.completions.create({
                    model: "llama-3.1-8b-instant",
                    messages: [{ role: "user", content: prompt }],
                });

                let content = response.choices[0]?.message?.content;
                if (content.length > 2000)
                    content = content.slice(0, 1997) + "...";

                await interaction.editReply({
                    embeds: [
                        {
                            author: {
                                name: prompt,
                            },
                            description: content,
                            color: 15480656,
                        },
                    ],
                });
            } catch (e) {
                await interaction.editReply(
                    `Oops! Something went wrong on our end.\nDebug: || ${e} ||`
                );
            }
        } else if (type === "image") {
            const width = 512;
            const height = 512;
            const seed = Date.now();
            const model = "turbo";

            const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
                prompt
            )}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

            await fetch(imageUrl);

            await interaction.editReply({
                embeds: [
                    {
                        author: {
                            name: prompt,
                        },
                        image: {
                            url: imageUrl,
                        },
                        color: 15480656,
                    },
                ],
            });
        }
    },
};
