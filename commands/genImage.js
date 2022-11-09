const { SlashCommandBuilder } = require("discord.js");
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("genimg")
        .setDescription("Generate random image with DALL E")
        .addStringOption(option =>
            option.setName('prompt')
            .setDescription('Description')
            .setRequired(true)),
        async execute(interaction){
            const prompt = interaction.options.getString('prompt');

            interaction.reply(`Call API .... [${prompt}]`);

            await axios({
                method: 'post',
                url: 'https://api.openai.com/v1/images/generations',
                headers: {'Authorization': 'Bearer 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'},
                data: {
                  prompt: prompt
                }
            })  
            .then(async function (response) {
                console.log(response.data.data[0].url);
                interaction.editReply(response.data.data[0].url);
            });
            
        },
};