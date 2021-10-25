const Discord = require('discord.js');
const superagent = require("superagent");
const { get } = require('superagent');
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
        name: 'futa',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (bot, message, args, settings) => {
    if(!message.channel.nsfw) return message.channel.send("This Commmand is only usable in NSFW channels.")
    const { url } = await fetch("https://nekos.life/api/v2/img/futanari")
      .then((res) => res.json());

    const embed = new Discord.MessageEmbed()
      .setTitle("Hentai GIF")
      .setImage(url)
      .setFooter(`Requested by: ${message.author.tag} | Powered by nekos.life`, message.author.displayAvatarURL({ size: 32 }));

    message.channel.send(embed);
  }
}
