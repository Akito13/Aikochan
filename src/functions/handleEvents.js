const {
    Events
} = require('../validation/eventNames');
const Ascii = require("ascii-table");

module.exports = (client) => {
    const Table = new Ascii("Events Loaded");

    client.handleEvents = async (eventFiles, path) => {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            if (!Events.includes(event.name) || !event.name) {
                Table.addRow(`${event.name || "MISSING"}`, `⛔ Event name is either invalid or missing: ../events/${file}`);
                return;
            }
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
            Table.addRow(event.name, "✔ SUCCESSFUL");
        }
        console.log(Table.toString());
    };
}