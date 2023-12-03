import { EmbedBuilder } from "discord.js";

/**
 * handleSearchCommand - search for a webtoon
 * @param {*} interaction
 * @param {*} fetch
 * @returns
 * @see https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor
 */
export async function handleSearchCommand(interaction) {
  const keyword = interaction.options.getString("keyword");
  try {
    const response = await fetch(
      `https://korea-webtoon-api.herokuapp.com/search?keyword=${encodeURIComponent(
        keyword
      )}`
    );
    const data = await response.json();

    console.log("Response:", data);

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
      interaction.reply("No webtoons found for the given keyword.");
    }
  } catch (error) {
    console.error("Error during fetch:", error);

    if (error.code === "ERR_SOCKET_CONNECTION_TIMEOUT") {
      interaction.reply(
        "Error: Connection to the server timed out. Please try again."
      );
    } else {
      interaction.reply(
        "An error occurred during the search. Please try again later."
      );
    }
  }
}
