import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { registerCommands } from "./routes/route.js";
import {
  handleRandomAnimeCommand,
  handleSearchAnimeCommand,
} from "./commands/anime.js";
import {
  handleRandomMangaCommand,
  handleSearchMangaCommand,
} from "./commands/manga.js";
import { handleRankCommand } from "./commands/rank.js";
import { handleHelpCommand } from "./commands/help.js";

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

// load registered commands
registerCommands(client, process.env.CLIENT_ID);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "randomanime":
      await handleRandomAnimeCommand(interaction);
      break;
    case "randommanga":
      await handleRandomMangaCommand(interaction);
      break;
    case "searchanime":
      await handleSearchAnimeCommand(interaction);
      break;
    case "searchmanga":
      await handleSearchMangaCommand(interaction);
      break;
    case "rank":
      await handleRankCommand(interaction);
      break;
    case "help":
      await handleHelpCommand(interaction);
      break;
    default:
      break;
  }
});

client.login(process.env.TOKEN);