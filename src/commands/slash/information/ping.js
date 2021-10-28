const {
    SlashCommandBuilder
} = require("@discordjs/builders");

function wait(ms, fn) {
    return new Promise(resolve => setTimeout(resolve.bind(null, fn), ms))
}

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Reply with Deez nuts!'),
    async execute(interaction) {
        await interaction.reply('Deez nuts');
        await wait(1500);
        await interaction.editReply('Another nut');
    }
};