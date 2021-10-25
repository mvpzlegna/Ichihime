const Discord = require('discord.js');
const superagent = require("superagent");


module.exports = {
        name: 'crot',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
      run: async (client, message, args) => {
        if (!message.channel.nsfw) return message.channel.send({embed: {
            color: 16734039,
            description: "You can use this command in an NSFW Channel!"
        }})

superagent.get('https://nekos.life/api/v2/img/cum')
    .end((err, response) => {
  const embed = new Discord.MessageEmbed()
  .setTitle(":smirk: crooooot~")
  .setImage(response.body.url)
  .setColor(`yellow`)
  .setFooter(`Tags: cum`)
  .setURL(response.body.url);
message.channel.send(embed);
}).catch((err) => message.channel.send({embed: {
            color: 16734039,
            description: "Something went wrong... :cry:"
        }}));
    }
}