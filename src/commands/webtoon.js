import { EmbedBuilder } from "discord.js";

/**
 * handleWebtoonSearchCommand - search for a webtoon
 * @param {*} interaction
 * @param {*} fetch
 * @returns
 * @see https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor
 */

export async function handleWebtoonSearchCommand(interaction) {
  const keyword = interaction.options.getString("keyword");
  if (!keyword) {
    await interaction.reply("Please provide a valid search query.");
    return;
  }
  try {
    const response = await fetch(
      `https://korea-webtoon-api.herokuapp.com/search?keyword=${encodeURIComponent(
        keyword
      )}`
    );
    const data = await response.json();
    if (data.webtoons.length > 0) {
      const firstWebtoon = data.webtoons[0];
      const embed = new EmbedBuilder()
        .setTitle(firstWebtoon.title)
        .setColor(0x0099ff)
        .addFields(
          {
            name: "Author",
            value: firstWebtoon.author || "No author found",
          },
          {
            name: "title",
            value: firstWebtoon.title || "No title found",
          },
          {
            name: "id",
            value: String(firstWebtoon.webtoonId).substring(7) || "No id found",
          },
          {
            name: "url",
            value: firstWebtoon.url || "No url found",
          }
        )
        .setImage(firstWebtoon.img)
        .setTimestamp()
        .setFooter({
          text: "Powered by Nomekuma",
          iconURL: "https://avatars.githubusercontent.com/u/122863540?v=4",
        });
      interaction.reply({ embeds: [embed.toJSON()] });
    } else {
      await interaction.reply("No webtoon found.");
    }
  } catch (err) {
    console.error(err);
    interaction.reply("Something went wrong.");
  }
}
