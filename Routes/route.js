import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands = [
  {
    name: "randomanime",
    description: "Provides a new anime to watch!",
  },
  {
    name: "randommovie",
    description: "Provides a new movie to watch!",
  },
  {
    name: "randomtvshow",
    description: "Provides a new TV show to watch!",
  },
  {
    name: "randommanga",
    description: "Provides a new manga to read!",
  },
  {
    name: "searchanime",
    description: "Search for an anime",
    options: [
      {
        name: "query",
        description: "Name of the anime",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "movies",
    description: "Provides a new movie to watch!",
  },
  {
    name: "tvshow",
    description: "Provides a new TV show to watch!",
  },
  {
    name: "rank",
    description:
      "Provides a rank of users based on their time on the Discord server!",
  },
  {
    name: "help",
    description: "Provides a list of commands",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
