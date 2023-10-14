# Kuma-Lite

## Introduction

Kuma-Lite is a Discord bot that provides anime and manga recommendations, as well as a ranking of server members based on their time in the server.

## Features

- `/randomanime`: Provides a random anime recommendation.
- `/randommanga`: Provides a random manga recommendation.
- `/searchanime`: Search for a specific anime by name.
- `/searchmanga`: Search for a specific manga by name.
- `/rank`: Displays a ranking of server members based on their time in the server.
- `/help`: Displays a list of available commands.

## Setup

1. Clone this repository.
2. Create a `.env` file in the project root and add the following variables:
   
   ```js
   CLIENT_ID=your_discord_bot_client_id
   TOKEN=your_discord_bot_token
   ```

3. Install the project dependencies:
   ```
   npm install
   ```
4. Run the bot:
   ```
   npm start
   ```

## Dependencies

- [discord.js](https://discord.js.org/): Discord API library for Node.js.

- [axios](https://axios-http.com/): Promise-based HTTP client for making requests.

- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `env` file.

## Usage

1. Add the bot to your Discord server by visiting the following link: https://discord.com/api/oauth2/authorize?client_id=1162683498042236968&permissions=8&scope=bot
2. Type `/help` in any channel to see a list of available commands.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the creators of Discord.js for providing an excellent library for Discord bot development.

