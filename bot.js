console.clear();
const {
  Client,
  Intents,
  Collection
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});
const fs = require("fs");

client.commands = new Collection();

require("dotenv").config();

const functionFiles = fs.readdirSync("./src/functions").filter((file) => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter((file) => file.endsWith(".js"));
const commandSlashFolder = fs.readdirSync("./src/commands/slash");

(async () => {
  for (file of functionFiles) {
    require(`./src/functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandSlashFolder, "./src/commands/slash");
  client.login(process.env.token);
  client.dbLogin();
})();