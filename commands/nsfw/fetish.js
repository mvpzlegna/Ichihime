const Discord = require('discord.js');
const superagent = require("superagent");
const { get } = require('superagent');
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const axios = require('axios');
const { fetchJson } = require('../../fetcher')

module.exports = {
        name: 'fetish',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (bot, message, args, settings) => {
        if (!message.channel.nsfw) {
            message.channel.send('This command only can be execute on nsfw channel!')
        }
        const randSub = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone', 'animearmpits', 'animefeets', 'animethighss', 'animebooty', 'biganimetiddies', 'animebellybutton', 'sideoppai', 'ahegao']
        const tag = randSub[Math.floor(Math.random() * randSub.length)]
        
        const m = await message.channel.send(`**Search image from ${tag}...**`)
        fetchJson(`https://meme-api.herokuapp.com/gimme/${tag}`).then(async (res) => {
            const { title, url, author } = res
            const embed = new MessageEmbed()
            .setTitle(title)
            .setImage(url)
            .setColor('BLUE')
            .setTimestamp()
            .setFooter('Some Fetish')

            return m.edit(`Some Fetish`, {embed: embed})
        })
    }
}
