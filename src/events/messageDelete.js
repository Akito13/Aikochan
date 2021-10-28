const {
    MessageEmbed,
    Message,
} = require('discord.js');

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Message} message 
     */

    async execute(message) {
        const {
            author,
            attachments,
            content,
            createdTimestamp
        } = message;
        if (message.author.bot) {
            return;
        } else {
            const channel = message.guild.channels.cache.find(ch => ch.name == "logs");
            const messageDeleteEmbed = new MessageEmbed()
                .setAuthor(`${author.tag}`, author.displayAvatarURL())
                .setColor("RED")
                .setDescription(`**Message deleted in ${message.channel} by ${author}**\n${content}`)
                .setFooter(`User ID: ${author.id}`)
                .setTimestamp(createdTimestamp);
            const messageHadAttachment = attachments.first();
            if (messageHadAttachment) {
                messageDeleteEmbed.setImage(messageHadAttachment.proxyURL);
            }

            channel.send({
                embeds: [messageDeleteEmbed]
            })
        }
    }
};