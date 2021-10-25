const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
        name: 'neko',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.channel.send("This Commmand is only usable in NSFW channels.")
        
        const { body } = await superagent
        .get("https://nekos.life/api/neko");
       const  link = body.neko;
        
        const embed = new Discord.MessageEmbed()
        .setColor(`cyan`)
        .setTitle("Here's Your Neko ")
        .setImage(body.neko)
         .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL())
        message.channel.send({embed})

    }
}