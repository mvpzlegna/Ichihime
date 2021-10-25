module.exports = (bot) => {
const Discord = require('discord.js');  
const { MessageEmbed } = require("discord.js");
const invites = {} // { guildId: { memberId: count } }

 const guildInvites = new Map();

bot.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
bot.on('ready', () => {
    console.log(`${bot.user.tag} has logged in.`);
    bot.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});

bot.on('guildMemberAdd', async member => {
    embed = new Discord.MessageEmbed()
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new MessageEmbed()
            .setDescription(`${member.user.tag} is the ${member.guild.memberCount} to join.\nJoined using ${usedInvite.inviter.tag}\nNumber of uses: ${usedInvite.uses}`)
            .setTimestamp()
            .setTitle(`${usedInvite.url}`);
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '738002259794722821');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});


  
bot.on('guildMemberRemove',  member => {

    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'goodbye')

    welcomeChannel.send(
            new Discord.MessageEmbed()
            .setColor("#f5f5f5")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`Action By ${bot.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`〚${member.user.tag}〛Left The server...`)
            .setDescription(`${member.user} Thank you for being part of the server!`)
            .setTimestamp()
            .setFooter(`${member.guild.name} Have Now ${member.guild.memberCount} members`, member.user.displayAvatarURL({ dynamic: true }))
        ) .catch (error => {
            console.log(error);
        })
})




  
  
  
}