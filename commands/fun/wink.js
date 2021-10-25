const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
        name: 'wink',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
    run: async (client, message, args) => {
        let { body } = await superagent.get(`https://some-random-api.ml/animu/wink`);
        const embed = new Discord.MessageEmbed()
          .setColor(`random`)
          .setTitle(" nyan~ ")
          .setImage(body.link)
          .setTimestamp()
          .setFooter(message.author.username, message.author.displayAvatarURL());
        message.channel.send(embed);
    }
}