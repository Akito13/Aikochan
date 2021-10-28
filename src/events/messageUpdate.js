const {
    MessageEmbed,
    Message,
    Client
} = require('discord.js');


module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     * @param {Client} client 
     * @returns 
     */
    async execute(oldMessage, newMessage, client) {

        if (oldMessage.content === newMessage.content || newMessage.author.bot === true) return;

        let messageUpdateEmbed = new MessageEmbed()
            .setAuthor(`${newMessage.author.tag}`, newMessage.author.displayAvatarURL())
            .setColor("ORANGE")
            .setDescription(`**Message edited in ${newMessage.channel}** [Jump to message](${newMessage.url})`)
            .addField(`**Before:**`, `\n${oldMessage.content}\n`, false)
            .addField(`**After:**`, `\n${newMessage.content.slice(0, 1950) + (newMessage.content.length > 1950 ? '...':'')}`, false)
            .setFooter(`User ID: ${newMessage.author.id}`)
            .setTimestamp(oldMessage.createdTimestamp);
        if (oldMessage.attachments.size > 0 || newMessage.attachments.size > 0) {
            messageUpdateEmbed
                .addField(`**Attachment**`,
                    `${newMessage.attachments > 0 ? newMessage.attachments.map(a=>a.url):oldMessage.attachments.map(a=>a.url)}`, false);
        }

        const channel = newMessage.guild.channels.cache.find(ch => ch.name == "logs");
        channel.send({
            embeds: [messageUpdateEmbed]
        });
    }
};