const mongoose = require("mongoose");
const fs = require("fs");

const mongoEventFiles = fs.readdirSync("./src/mongoEvents")
module.exports = client => {
    for (file of mongoEventFiles) {
        const event = require(`../mongoEvents/${file}`);
        if (event.once) {
            mongoose.connection.once(event.name, (...args) => event.execute(...args));
        } else {
            mongoose.connection.on(event.name, (...args) => event.execute(...args));
        }
        client.dbLogin = async () => {
            mongoose.Promise = global.Promise;
            await mongoose.connect(process.env.dbToken);
        };
    }
};