  
const Discord = require('discord.js');
const superagent = require("superagent");


module.exports = {
        name: 'hanal',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
    run: async (bot, message, args) => {
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send({embed: {
                    color: 16734039,
                    description: "You can use this command in an NSFW Channel!"
                }})
        }
        superagent.get('https://nekos.life/api/v2/img/anal')
            .end((err, response) => {
          const embed = new Discord.MessageEmbed()
          .setTitle(":smirk: tusbol")
          .setImage(response.body.url)
          .setColor(`red`)
          .setFooter(`Tags: anal`)
          .setURL(response.body.url);
      message.channel.send(embed);
        }).catch((err) => message.channel.send({embed: {
                    color: 16734039,
                    title: "Something went wrong... :cry:"
                }}));
    }
}