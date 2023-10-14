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

  //   randomanime command
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

  // searchanime command
  if (interaction.commandName === "searchanime") {
    try {
      // Get the query from the user
      const query = interaction.options.getString("query");
      console.log(query);
      console.log(interaction.options);
      console.log(interaction);

      if (!query) {
        await interaction.reply("Please provide a valid search query.");
        return;
      }

      // Make a GET request to the search anime endpoint
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}`
      );

      const data = response.data.data;

      // Check if there's a YouTube trailer available
      let trailerUrl = "No trailer available";
      if (data.trailer?.youtube_id) {
        trailerUrl = `https://www.youtube.com/watch?v=${data.trailer.youtube_id}`;
      }

      // Fallback image URLs
      const thumbnailUrl = "https://example.com/default-thumbnail.jpg";
      const imageUrl = "https://example.com/default-image.jpg";

      const startDate = data.aired ? data.aired.from || "N/A" : "N/A";
      const endDate = data.aired ? data.aired.to || "N/A" : "N/A";

      const embed = {
        title: data.title,
        url: data.url,
        color: 0x0099ff,
        description: data.synopsis,
        thumbnail: {
          url: thumbnailUrl,
        },
        fields: [
          {
            name: "Type",
            value: data.type || "N/A",
            inline: true,
          },
          {
            name: "Episodes",
            value: data.episodes ? data.episodes.toString() : "N/A",
            inline: true,
          },
          {
            name: "Start Date",
            value: startDate,
            inline: true,
          },
          {
            name: "End Date",
            value: endDate,
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
            value: trailerUrl,
            inline: true,
          },
        ],
        image: {
          url: imageUrl,
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
    if (timeInServer >= 365) {
      return { label: "🥇", name: "Gold" };
    } else if (timeInServer >= 180) {
      return { label: "🥈", name: "Silver" };
    } else if (timeInServer >= 90) {
      return { label: "🥉", name: "Bronze" };
    } else if (timeInServer >= 30) {
      return { label: "👶", name: "Newbie" };
    } else if (timeInServer >= 7) {
      return { label: "👼", name: "Lesser" };
    } else if (timeInServer >= 1) {
      return { label: "👤", name: "Newcomer" };
    } else {
      return { label: "👻", name: "Visitor" };
    }
  }

  if (interaction.commandName === "help") {
    const embed = {
      title: "Help",
      color: 0x0099ff,
      fields: [
        {
          name: "/ping",
          value: "Replies with Pong!",
          inline: true,
        },
        {
          name: "/randomanime",
          value: "Provides a new anime to watch!",
          inline: true,
        },
        {
          name: "/searchanime",
          value: "Provides a new anime to watch!",
          inline: true,
        },
        {
          name: "/movies",
          value: "Provides a new movie to watch!",
          inline: true,
        },
        {
          name: "/tvshow",
          value: "Provides a new TV show to watch!",
          inline: true,
        },
        {
          name: "/rank",
          value:
            "Provides a rank of users based on their time on the Discord server!",
          inline: true,
        },
        {
          name: "/help",
          value: "Provides a list of commands",
          inline: true,
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
