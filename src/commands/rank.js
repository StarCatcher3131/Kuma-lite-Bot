/**
 *
 * @param {*} interaction - Represents a Discord interaction
 */

export function handleRankCommand(interaction) {
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

  interaction.reply({ embeds: [embed] });
}
/**
 *
 * @param {Date} joinDate - Represents the date a member joined the server
 * @param {*} currentDate - Represents the current date
 * @returns {string}
 */
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
/**
 * Determines the rank based on the time in the server.
 * 
 * @param {string} timeInServer - Formatted time spent in the server.
 * @returns {Object} - Rank object with label and name.
 */
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
