import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";
import dotenv from "dotenv";

// load env variables
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// message if bot is ready
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  // randomanime command
  if (interaction.commandName === "randomanime") {
    try {
      // Make a GET request to the specified endpoint
      const response = await axios.get("https://api.jikan.moe/v4/random/anime");
      const data = response.data.data;

      // Check if there's a YouTube trailer available
      let trailerUrl = "No trailer available";
      if (data.trailer?.youtube_id) {
        trailerUrl = `https://www.youtube.com/watch?v=${data.trailer.youtube_id}`;
      }

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
            name: "Episodes",
            value: data.episodes ? data.episodes.toString() : "N/A", // Use "N/A" if data.episodes is null
            inline: true,
          },
          {
            name: "Start Date",
            value: data.aired.from || "N/A", // Use "N/A" if data.aired.from is null
            inline: true,
          },
          {
            name: "End Date",
            value: data.aired.to || "N/A", // Use "N/A" if data.aired.to is null
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
          {
            name: "Trailer",
            value: trailerUrl,
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

  // randomtvshow command
  if (interaction.commandName === "randomtvshow") {
  }
  // randommovie command
  if (interaction.commandName === "randommovie") {
  }

  // randommanga command
  if (interaction.commandName === "randommanga") {
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

  // searchanime command
  if (interaction.commandName === "searchanime") {
    try {
      const query = interaction.options.getString("query");
      if (!query) {
        await interaction.reply("Please provide a valid search query.");
        return;
      }

      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}`
      );
      let data = response.data.data[0]; // Using 'let' to allow reassignment

      // Check if the data exists, if not, provide empty values
      if (!data) {
        data = {
          title: "N/A",
          url: "",
          synopsis: "N/A",
          type: "N/A",
          episodes: "N/A",
          aired: { from: "N/A", to: "N/A" },
          score: "N/A",
          rating: "N/A",
          images: { jpg: { image_url: "" } },
          trailer: { youtube_id: "" },
        };
      }

      let trailerUrl = "No trailer available";
      if (data.trailer?.youtube_id) {
        trailerUrl = `https://www.youtube.com/watch?v=${data.trailer.youtube_id}`;
      }

      const embed = {
        title: data.title,
        url: data.url || "",
        color: 0x0099ff,
        description: data.synopsis,
        thumbnail: {
          url: data.images?.jpg?.image_url || "",
        },
        fields: [
          {
            name: "Type",
            value: data.type,
            inline: true,
          },
          {
            name: "Episodes",
            value: data.episodes.toString(),
            inline: true,
          },
          {
            name: "Start Date",
            value: data.aired.from,
            inline: true,
          },
          {
            name: "End Date",
            value: data.aired.to,
            inline: true,
          },
          {
            name: "Score",
            value: data.score.toString(),
            inline: true,
          },
          {
            name: "Rated",
            value: data.rating,
            inline: true,
          },
          {
            name: "Trailer",
            value: trailerUrl,
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

  // searchmanga command
  if (interaction.commandName === "searchmanga") {
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

  // Rank command
  if (interaction.commandName === "rank") {
    const guild = interaction.guild;
    const currentDate = new Date();

    // Create a message with the ranked list
    const rankMessage = `**Server Rank**
Ranking of Members Bred edition

${guild.members.cache
  .map((member) => {
    const joinDate = member.joinedAt;
    const timeInServer = calculateTimeInServer(joinDate, currentDate);
    const rank = getRank(timeInServer);
    return `**${member.user.tag} - ${timeInServer} - ${rank.label} - ${rank.name}`;
  })
  .join("\n")}`;

    // Create an embed to send the ranked list
    const embed = {
      title: "Server Rank",
      color: 0x0099ff,
      description: rankMessage,
      timestamp: new Date(),
      footer: {
        text: "Powered by Nomekuma",
        icon_url: "https://avatars.githubusercontent.com/u/122863540?v=4",
      },
    };

    await interaction.reply({ embeds: [embed] });
  }

  // Function to calculate the time a member has spent in the server
  function calculateTimeInServer(joinDate, currentDate) {
    let timeDiff = currentDate - joinDate;

    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    timeDiff -= years * (1000 * 60 * 60 * 24 * 365);

    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    timeDiff -= months * (1000 * 60 * 60 * 24 * 30);

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    timeDiff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(timeDiff / (1000 * 60));
    timeDiff -= minutes * (1000 * 60);

    const seconds = Math.floor(timeDiff / 1000);
    timeDiff -= seconds * 1000;

    const milliseconds = timeDiff;

    let formattedTime = "";
    if (years > 0) {
      formattedTime += `${years} yrs `;
      if (months > 0 || days > 0) {
        formattedTime += `${months} months `;
      }
    } else if (months > 0) {
      formattedTime += `${months} months `;
      if (days > 0) {
        formattedTime += `${days} days `;
      }
    } else if (days > 0) {
      formattedTime += `${days} days `;
    } else if (hours > 0) {
      formattedTime += `${hours} hrs `;
      if (minutes > 0) {
        formattedTime += `${minutes} mins `;
      }
    } else if (minutes > 0) {
      formattedTime += `${minutes} mins `;
      if (seconds > 0) {
        formattedTime += `${seconds} secs `;
      }
    } else if (seconds > 0) {
      formattedTime += `${seconds} secs `;
      if (milliseconds > 0) {
        formattedTime += `${milliseconds} ms `;
      }
    } else {
      formattedTime += `${milliseconds} ms `;
    }

    return formattedTime;
  }

  // Function to determine the rank based on the time in server
  function getRank(timeInServer) {
    if (timeInServer.includes("yrs")) {
      return { label: "🥇", name: "Gold" };
    } else if (timeInServer.includes("month") || timeInServer.includes("mo")) {
      return { label: "🥈", name: "Silver" };
    } else if (timeInServer.includes("day")) {
      return { label: "🥉", name: "Bronze" };
    } else if (timeInServer.includes("hr")) {
      return { label: "👶", name: "Newbie" };
    } else if (timeInServer.includes("sec")) {
      return { label: "👼", name: "Lesser" };
    } else {
      return { label: "👤", name: "Newcomer" };
    }
  }

  if (interaction.commandName === "help") {
    const embed = {
      title: "Help",
      color: 0x0099ff,
      fields: [
        {
          name: "Commands",
          value: `
                    **/randomanime** - Provides a new anime to watch!
                    **/randommanga** - Provides a new manga to read!
                    **/searchanime** - Search for an anime
                    **/searchmanga** - Search for a manga
                    **/rank** - Provides a rank of users based on their time on the Discord server!
                    **/help** - Provides a list of commands
                  `,
        },
      ],
      timestamp: new Date(),
      footer: {
        text: "Powered by Nomekuma",
        icon_url: "https://avatars.githubusercontent.com/u/122863540?v=4",
      },
    };
    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
