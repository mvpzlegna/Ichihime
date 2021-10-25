const Discord = require('discord.js');
const superagent = require("superagent");
const { get } = require('superagent');
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const axios = require('axios');
const { fetchJson } = require('../../fetcher')

module.exports = {
        name: 'loli',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (bot, message, args, settings) => {
          axios.get('https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA')
        .then((res) => {
            const embed = new MessageEmbed()
            .setImage(res.data.result)
            .setColor('BLUE')
            .setTimestamp()
            .setFooter('Random Lolis')

            message.channel.send(embed)
        })
    }
}