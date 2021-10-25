const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
        name: 'puk',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
      run: async (client, message, args) => {
        let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/pat");
              const embed = new Discord.MessageEmbed()
             .setColor(`cyan`)
              .setTitle("puk puk puk 👀")
          .setDescription(`${victim} Pats ${message.author}`)
          .setImage(body.url)
           .setTimestamp()
          .setFooter(message.author.username, message.author.displayAvatarURL())
      
               message.channel.send(embed);
    }
}