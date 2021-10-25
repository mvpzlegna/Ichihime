const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const { formatDate } = require("../../functions");
module.exports = {
  name: "profile",
  description: "Get your own or someone else's avatar",
  usage: "[user mention]",
  category: "fun",
  run: async (bot, message, args) => {
    let Embed = new MessageEmbed();
    let roles = [];
      if (!message.mentions.users.first()) {
      message.member.roles.cache.forEach((role) => {
          roles.push(role.name)
      });
      Embed.setTitle(`Your profile!`)
      Embed.setThumbnail(message.author.displayAvatarURL({ dynamic : true, size : 1024, format: 'png' }));
      Embed.setURL(message.author.displayAvatarURL({ dynamic : true, size : 4096, format: 'png' }));
      Embed.setColor(`RANDOM`)
      Embed.addField('Status', message.author.presence.status, true)
      Embed.addField("Activity",`${message.author.presence.activities[0] ? message.author.presence.activities[0].name : "User isn't playing"}`, true)
      Embed.addField('Account Type', `${message.bot ? 'Bot' : 'Human'}`)
      Embed.setDescription(`Joined: ${moment.utc(message.guild.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}\nCreated: ${moment.utc(message.author.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}\nID: ${message.author.id}\nRoles: ${roles} ${message.author.username}#${message.author.discriminator}`)
      Embed.setFooter(message.author.username, message.author.displayAvatarURL())
      Embed.setTimestamp(message.createdAt)
      return message.channel.send(Embed)//.then(m => m.delete({timeout: 10000}))
    } else {
      let User = message.mentions.members.first()
      User.roles.cache.forEach((role) => {
          roles.push(role.name);
      })
      const user = message.mentions.users.first() || message.author;
      Embed.setTitle(`${bot.users.cache.get(User.id).tag}'s profile!`)
      Embed.setThumbnail(bot.users.cache.get(User.id).displayAvatarURL({ dynamic : true, size : 1024, format: 'png' }))
      Embed.setURL(bot.users.cache.get(User.id).displayAvatarURL({ dynamic : true, size : 4096, format: 'png' }));
      Embed.setColor(`RANDOM`)
      Embed.addField('Status', bot.users.cache.get(User.id).presence.status, true)
      Embed.addField("Activity",`${User.presence.activities[0] ? User.presence.activities[0].name : "User isn't playing"}`, true)
      Embed.addField('Account Type', `${user.bot ? 'Bot' : 'Human'}`)
      Embed.setDescription(`Joined: ${moment.utc(User.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}\nCreated: ${moment.utc(bot.users.cache.get(User.id).createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}\nID: ${User.id}\nRoles: ${roles} ${bot.users.cache.get(User.id).username}#${bot.users.cache.get(User.id).discriminator}`)
      Embed.setFooter(bot.users.cache.get(User.id).username, bot.users.cache.get(User.id).displayAvatarURL())
      Embed.setTimestamp(message.createdAt)
      return message.channel.send(Embed)//.then(m => m.delete({timeout: 10000}))
    }
  }
}