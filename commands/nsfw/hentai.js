const Discord = require('discord.js');
const superagent = require("superagent");
const { get } = require('superagent');
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const axios = require('axios');

module.exports = {
        name: 'hentai',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (bot, message, args, settings) => {
        if (!message.channel.nsfw) {
            message.channel.send('This command only can be execute on nsfw channel!')
        } else {
            axios.get('https://api.computerfreaker.cf/v1/hentai', { headers: { 'User-Agent': `superagent`} } )
            .then((res) => {
            const embed = new MessageEmbed()
            .setImage(res.data.url)
            .setColor('BLUE')
            .setTimestamp()
            .setFooter('Random Hentai')

            message.channel.send(embed)
            })
        }
    }

}
