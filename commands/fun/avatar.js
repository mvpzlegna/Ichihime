const Discord = require('discord.js');
const superagent = require('superagent')
const { MessageEmbed } = require('discord.js')
const { owner } = require('../../config.json')

module.exports = {
        name: 'avatar',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (client, message, args) => {
        const mentioned = message.mentions.users.first() || message.author;

        const embed = new MessageEmbed()
        .setImage(mentioned.displayAvatarURL({ size: 4096, format: 'png', dynamic: true }))
        .setColor('BLUE')
        .setTimestamp()
        .setDescription(`[\`link avatar\`](${mentioned.displayAvatarURL({ size: 4096, format: 'png', dynamic: true })})`)
        .setFooter(`Avatar of ${mentioned.tag}`)

        message.channel.send(embed)
    }
}