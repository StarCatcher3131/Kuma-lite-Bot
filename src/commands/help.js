/**
 * handleHelpCommand - Handles the help command
 * @param {*} interaction - Represents a Discord interaction
 */
import { EmbedBuilder } from "discord.js";

export function handleHelpCommand(interaction) {
  interaction.deferReply();
  const embed = new EmbedBuilder()
    .setTitle("Help")
    .setColor(0x0099ff)
    .addFields({
      name: "Commands",
      value: `
          **/randomanime** - Provides a new anime to watch!
          **/randommanga** - Provides a new manga to read!
          **/searchanime** - Search for an anime
          **/searchmanga** - Search for a manga
          **/rank** - Provides a rank of users based on their time on the Discord server!
          **/help** - Provides a list of commands
        `,
    })
    .setTimestamp(new Date())
    .setFooter({
      text: "Powered by Nomekuma",
      iconURL: "https://avatars.githubusercontent.com/u/122863540?v=4",
    });

  interaction.reply({ embeds: [embed] });
  interaction.followUp("This is a follow up message");
}
