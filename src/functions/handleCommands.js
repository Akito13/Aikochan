const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const fs = require('fs');

// Place your client and guild ids here
const clientId = '739032409722323014';
const guildId = '773379601271095316';

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandSlashArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const commandSlash = require(`../commands/slash/${folder}/${file}`);
                client.commands.set(commandSlash.data.name, commandSlash);
                client.commandSlashArray.push(commandSlash.data.toJSON());
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), {
                        body: client.commandSlashArray
                    },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();

    };
};