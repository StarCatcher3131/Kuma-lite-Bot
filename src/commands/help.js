/**
 * handleHelpCommand - Handles the help command
 * @param {*} interaction - Represents a Discord interaction
 */
export function handleHelpCommand(interaction) {
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
  interaction.reply({ embeds: [embed] });
}
