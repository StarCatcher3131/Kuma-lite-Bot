import axios from "axios";

/**
 * 
 * @param {Object} interaction - Represents a Discord interaction 
 */
export async function handleRandomMangaCommand(interaction) {
  try {
    // Make a GET request to the specified endpoint
    const response = await axios.get("https://api.jikan.moe/v4/random/manga");
    const data = response.data.data;

    const embed = {
      title: data.title,
      url: data.url,
      color: 0x0099ff,
      description: data.synopsis,
      thumbnail: {
        url: data.images.jpg.image_url,
      },
      fields: [
        {
          name: "Type",
          value: data.type || "N/A", // Use "N/A" if data.type is null
          inline: true,
        },
        {
          name: "Volumes",
          value: data.volumes ? data.volumes.toString() : "N/A", // Use "N/A" if data.volumes is null
          inline: true,
        },
        {
          name: "Chapters",
          value: data.chapters ? data.chapters.toString() : "N/A", // Use "N/A" if data.chapters is null
          inline: true,
        },
        {
          name: "Start Date",
          value: data.published.from || "N/A", // Use "N/A" if data.published.from is null
          inline: true,
        },
        {
          name: "End Date",
          value: data.published.to || "N/A", // Use "N/A" if data.published.to is null
          inline: true,
        },
        {
          name: "Score",
          value: data.score ? data.score.toString() : "N/A", // Use "N/A" if data.score is null
          inline: true,
        },
        {
          name: "Rated",
          value: data.rating || "N/A", // Use "N/A" if data.rating is null
          inline: true,
        },
      ],
      image: {
        url: data.images.jpg.image_url,
      },
      timestamp: new Date(),
      footer: {
        text: "Powered by Nomekuma",
        icon_url: "https://avatars.githubusercontent.com/u/122863540?v=4",
      },
    };

    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error(error);
  }
}

/**
 * 
 * @param {*} interaction - Represents a Discord interaction
 */
export async function handleSearchMangaCommand(interaction) {
  try {
    const query = interaction.options.getString("query");
    if (!query) {
      await interaction.reply("Please provide a valid search query.");
      return;
    }

    const response = await axios.get(
      `https://api.jikan.moe/v4/manga?q=${query}`
    );
    const data = response.data.data[0];

    const embed = {
      title: data.title || "N/A",
      url: data.url || "",
      color: 0x0099ff,
      description: data.synopsis || "N/A",
      thumbnail: {
        url: data.images?.jpg?.image_url || "",
      },
      fields: [
        {
          name: "Type",
          value: data.type || "N/A",
          inline: true,
        },
        {
          name: "Volumes",
          value: data.volumes ? data.volumes.toString() : "N/A",
          inline: true,
        },
        {
          name: "Chapters",
          value: data.chapters ? data.chapters.toString() : "N/A",
          inline: true,
        },
        {
          name: "Start Date",
          value: data.published?.from || "N/A",
          inline: true,
        },
        {
          name: "End Date",
          value: data.published?.to || "N/A",
          inline: true,
        },
        {
          name: "Score",
          value: data.score ? data.score.toString() : "N/A",
          inline: true,
        },
        {
          name: "Rated",
          value: data.rating || "N/A",
          inline: true,
        },
        {
          name: "Trailer",
          value: data.trailer?.youtube_id
            ? `https://www.youtube.com/watch?v=${data.trailer.youtube_id}`
            : "No trailer available",
          inline: true,
        },
      ],
      image: {
        url: data.images?.jpg?.image_url || "",
      },
      timestamp: new Date(),
      footer: {
        text: "Powered by Nomekuma",
        icon_url: "https://avatars.githubusercontent.com/u/122863540?v=4",
      },
    };

    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error(error);
  }
}
