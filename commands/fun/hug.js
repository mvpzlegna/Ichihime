const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
        name: 'peluk',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
   run: async (bot, message, args) => {
        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/hug");
              const embed = new Discord.MessageEmbed()
             .setColor(`blue`)
              .setTitle("🤗")
          .setDescription(`${victim} is hugged by ${message.author}`)
          .setImage(body.url)
           .setTimestamp()
          .setFooter(message.author.username, message.author.displayAvatarURL())
      
        message.channel.send(embed);
        
    }
}