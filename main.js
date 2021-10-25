const http = require('http');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT || 8000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);



const Discord = require('discord.js');
const bot = new Discord.Client({
  disableMentions: "everyone",
  partials: ["REACTION"],
});


const db = require('quick.db');
const ytdl = require("ytdl-core");
const { join } = require("path");
const ffmpeg = require('fluent-ffmpeg');
const { Collection } = require("discord.js");
const path = require('path');
const { Structures } = require('discord.js');
const queue = new Map();
const { youtubeAPI } = require('./config.json');
const config = require("./config.json");
const prefix = config.prefix;
const YouTube = require('simple-youtube-api');
const yts = require('yt-search');
const inviteNotifications = require('./invite-notifications');
const memberCount = require('./member-count');
const memberOffline = require('./member-offline');
const memberBot = require('./member-bot');
const memberOnline = require('./member-online');
//const clock = require('./clock');
const createBar = require("string-progressbar");
const lyricsFinder = require("lyrics-finder");
const ms = require('ms');
const fs = require("fs");
const { TOKEN, PREFIX, ServerID, CHANNEL_ID, SERVER_CHANNEL_ID, QUEUE_LIMIT } = require("./config.json");
const { MessageEmbed } = require("discord.js");
const YouTubeNotifier = require('youtube-notification');
bot.prefix = prefix;
bot.queue = new Map();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.events = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");

["command", "server"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot)
});


const ytdlOptions = {
  filter: 'audioonly',
  quality: 'highestaudio',
  format: 'mp3'
};








bot.on("ready", async () => {
    console.log(`✨${bot.user.username} siap Online senpai!❤️`)
    memberCount(bot)
    memberOnline(bot)
    memberBot(bot)
    memberOffline(bot)
    //clock(bot)
;
})

bot.on("reconnecting", async () => {
    console.log(`sebentar ya senpai, ${bot.user.username} sedang menyambung ulang~`);
})

bot.on("disconnect", async () => {
    console.log(`${bot.user.username} terputus dari dunia`);
})






















const moment = require('moment');
bot.on('ready', () => {
    setInterval(() => {
      targetGuild = bot.guilds.cache.get('721291694196391947')
      if(targetGuild) {
          bot.user.setPresence({ activity: { name: `✨>type !help | [${moment().format('YYYY-MM-DD HH:mm:ss')}] | ${bot.user.tag}| [${bot.users.cache.size}] users | [${bot.guilds.cache.size}] guilds | [${bot.channels.cache.size}] channels` , type: 'STREAMING' , url: 'https://www.twitch.tv/monstercat'}, status: 'online'  })
                .then(console.log)
                .catch(console.error);
      }
}, 1000 * 60 * 5);

});

inviteNotifications(bot)



bot.on("messageDelete", async (message) => {
  require("./events/guild/messageDelete")(message);
});
bot.on("messageUpdate", async (oldMessage, newMessage) => {
  require("./events/guild/messageUpdate")(oldMessage, newMessage);
});





bot.on('message', async message=>{
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  const command = bot.commands.get(cmd);
  if(!command) command == bot.commands.get(bot.aliases.get(cmd));
  if(command) command.run(bot,message,args);
  return;
})







bot.config = config;
const { GiveawaysManager } = require('discord-giveaways');

bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});




var afk = new Map();


bot.on("message", message => {
  if (message.author.bot || message.channel.type === "dm") return;
  
  if (afk.has(message.author.id)) {
    if (message.content.startsWith(prefix)) return;
    message.reply(`Welcome back ${message.author.tag}, Rena hapus AFKnya ya`);
    afk.delete(message.author.id)
  }

  
  if (message.mentions.users.first()) {
    if (afk.has(message.mentions.users.first().id)) {
      message.reply(`${message.mentions.users.first().username} sedang AFK, reason: ${afk.get(message.mentions.users.first().id).reason}`);
      message.author.send(`${message.mentions.users.first().username} sedang AFK, reason: ${afk.get(message.mentions.users.first().id).reason}`)
    }
  }
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (command === 'afk') {
    const reason = args.join(" ") ? args.join(" ") : "No Reason"
    afk.set(message.author.id, {
      reason: reason
    })
    message.reply('Kamu dalam mode AFK')
  }
  
  
  
})
  


bot.on("message", message => {
if(message.author.bot || message.channel.type === "dm");
    let prefix = "!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //const person = message.guild.members.cache.get(message.channel.name)
    //const target = message.guild.members.cache.find((x) => x.id === args[0])
   
  
  if(cmd === `${prefix}dm`) {
   let dUser =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.cache.get(args[0]);
   if (!dUser) return message.channel.send("Can't find user!");
   if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("kamu tidak bisa menggunakan command ini!");
   let dMessage = args.join(' ').slice(22);
   if (dMessage.length < 1) return message.reply('You must supply a message!');

   const embed = new MessageEmbed() 
        .setDescription(`${dUser} kamu dapat pesan dari ${message.author} : ${dMessage}`)
        .setColor("GREEN")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
        .setTimestamp();
        dUser.send(embed);   
   
   
    
    message.author.send(
  `${message.author} You have sent your message to ${dUser.user.tag}`
 );
    
}
});

  
  









bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm");
    let prefix = "!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice[1];
    
    if(cmd === `${prefix}ping`){
        const start = Date.now()
        message.channel.send("Pingging...").then(m =>{
        const end = Date.now()
        setTimeout(function(){
        m.edit("🏓 Pong!\n`" + `BOT Latency | ${Date.now() - message.createdTimestamp}` + " ms` \n`" + `API Latency | ${Math.round(bot.ws.ping)}` + " ms` ")
          }, 0)
    })}
    if (message.content === 'lewd') {
        message.reply('aaahhn~❤️', {files: ['https://i.imgur.com/s43CSrm.jpg']}).then(m => m.delete({timeout: 5000}))
    }
    if(cmd === `${prefix}uptime`){
        message.channel.send(`uptime ku sudah \`${ms(bot.uptime, { long: true })}\` senpai!✨`).then(m => m.delete({timeout: 5000}))
    }

    if(cmd === `${prefix}kst`){
      message.channel.send(`waktu Seoul adalah \`${moment().utcOffset(+9).format("MMMM Do YYYY, HH:mm:ss a")}\` \nwaktu Jakarta adalah \`${moment().format('MMMM Do YYYY, HH:mm:ss a')}\``)//.then(m => m.delete({timeout: 5000}))
  }
  
  
      if(cmd === `${prefix}nsfw`){
        embed = new Discord.MessageEmbed()
        //.setAuthor(message.author.username, message.author.displayAvatarURL())
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setDescription("🔞NSFW list command")
        //.setImage("https://i.imgur.com/6W4UF4r.png")
        .setColor("#8034eb")
        .addField("✨·Hentai",'**!neko** (kumpulan neko kawaii~ SFW)\n\n**!crot** (crot moncrot~ NSFW)\n\n**!emut** (nyot dikenyot nyot~ NSFW)\n\n**!hgif** (hentai gif random NSFW)\n\n**!hneko** (hentai neko mantep2 NSFW)\n\n**!lgif** (lewd neko SFW)\n\n\n', true)
        .addField("🔞·Porn",'**!anal** (gif anal)\n`gunakan !play beserta judul/linknya di channel `<#723541759816368241>\n\n**!anal2** (anal2)\n\n**!stop** (untuk menghentikan lagu)\n\n\n', true)
        .addField("`🚨attention🚨`","⚠️ **informasi lebih lanjut hubungi** <@&723360791163568221><@&723356393272377465>")
        .setFooter(`requested by ${message.author.username}#${message.author.discriminator} · Copyright © 2020 Rena · All rights reserved`, 'https://i.imgur.com/ay4f4ha.png')
        .setTimestamp();
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }
  
  
  
  
  






















  
  
  
  

    if(cmd === `${prefix}list`){
        embed = new Discord.MessageEmbed()
        //.setAuthor(message.author.username, message.author.displayAvatarURL())
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle("list Command Directory")
        .setImage("https://i.imgur.com/6W4UF4r.png")
        .setColor("#5effdc")
        .setThumbnail(bot.user.displayAvatarURL())
        .addField("Card","!champ_athena\n!thetis\n!new_sophie\n!muse\n!post_leblanc\n!asha\n!sid\n!dion\n!lulubel\n!mnemion\n!ren\n!lilith\n!fey\n!nicole\n!joey\n!ciel\n!bolang\n!rock_star_queen\n!rena\n!hanbok_lucia\n!amber\n!caren\n!nirvana\n!jeonwoochi\n!ra\n!zaha\n!misty\n!dark_antoinette\n!athena\n!lucia\n!new_rolland", true)
        .addField("Pendant","!space_pirate\n!blackhole_warpbot\n!titan_gauntlet\n!paint_roller\n!shield_jetpack\n!teddy_tarot_card\n!ninja_shoes\n!scarecrow_helmet\n!ironwall_helmet\n!diamond_punch_gun\n!pumpkin_helmet\n!gravity_destruction\n!contributor_copycat_drone\n!spy_trap\n!dark_bubble_gun\n!doublewing_jetpack\n!shield_drone\n!landlord_teddy_bear\n!completion_guardian_drone\n!titanium_helmet\n!teleport_drawing\n!corner_magnetic_core\n!spiderweb_catchbot\n!ultimate_defense_ring\n!confinement_magnetic_core\n!spaceships_drawing\n!magic_brush\n!punch_gloves\n!bubble_shoes\n!protect_shoes\n!keystone_badge\n!sudim\n!pirate_teddy_bear\n!controversial_copycat\n!copycat_drone\n!jumping_draw\n!black_dragon_ring\n!amor_party\n!sky_town_plan\n!accurate_blackhole\n!bubble_escape_pin\n", true)
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`requested by ${message.author.username}#${message.author.discriminator} · Copyright © 2020 Rena · All rights reserved` + message.author.id, 'https://i.imgur.com/d7t6HZc.png')
        .setTimestamp();
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 20000}))
    }
    
    if(cmd === `${prefix}help`){
        embed = new Discord.MessageEmbed()
        //.setAuthor(message.author.username, message.author.displayAvatarURL())
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle("List Command Rena")
        .setDescription("🤗 hi senpai~, ada yang bisa Rena bantu?")
        //.setImage("https://i.imgur.com/6W4UF4r.png")
        .setColor("#8034eb")
        .addField("General Command",'**!list**\n`gunakan !list di channel `<#729716738203320340>\n\n**!ping**\n\n**!suit**\n\n**!report** <tag member> <isi laporan>\n\n\n', true)
        .addField("Music Command",'**!play**\n`gunakan !play beserta judul/linknya di channel `<#723541759816368241>\n\n**!skip**\n\n**!pause**\n\n**!resume**\n\n**!stop**\n\n**!queue**\n\n\n', true)
        .addField("`🚨attention🚨`","⚠️ **informasi lebih lanjut hubungi** <@&723360791163568221><@&723356393272377465>")
        .setFooter(`requested by ${message.author.username}#${message.author.discriminator} · Copyright © 2020 Rena · All rights reserved`, 'https://i.imgur.com/ay4f4ha.png')
        .setTimestamp();
        message.channel.send({ embed: embed })//.then(m => m.delete({timeout: 15000}))
    }

  

    if(cmd === `${prefix}clear`){
    const messageArray = message.content.split(' ');
	  const args = messageArray.slice(1);

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('maaf, kamu tidak punya akses!').then(m => m.delete({timeout: 3000}));
    
    let deleteAmount;

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('input berapa yang akan di hapus').then(m => m.delete({timeout: 3000})) }

    if (parseInt(args[0]) > 100) {
        return message.reply('kamu hanya bisa hapus 100 pesan')
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount + 1, true);
    await message.channel.send(`***${deleteAmount}*** **pesan** berhasil dihapus.`).then(m => m.delete({timeout: 3000}))
  
}


   
  

  
  


  
  

  

  

  
  
  
  
  
  
  
  



  
    if (message.channel.type == "dm") 
    if(cmd === `${prefix}ninja_shoes`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Ninja Shoes")
        .setThumbnail("https://i.imgur.com/De9Qz8q.png")
        .addField("🔮 Ability","When construct, 35%(38%) teleport to my area and roll dice 1x (No active, +15%)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved`, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}ironwall_helmet`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Ironwall Defense Helmet")
        .setThumbnail("https://i.imgur.com/EwkmUFs.png")
        .addField("🔮 Ability","Dice control 53% (2nd turn, +6%(+7%)) / 80% defend force move skills (2 times)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}scarecrow_helmet`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Scarecrow Helmet")
        .setThumbnail("https://i.imgur.com/yUA6XGP.png")
        .addField("🔮 Abillity","Dice control 53%(54%) (use odd even, +10%) / Passing opponent, 73%(80%) transform opponent into Scarecrow Mode\n\nScarecrow Mode: 1. can't use skill, 2. only for 1 turn, will disappear even when enemy got double")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}pumpkin_helmet`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Shining/Awaken) Pumpkin Helmet")
        .setThumbnail("https://i.imgur.com/asUTWfb.png")
        .addField("🔮 Ability","Dice control 53%(53%/54%) (odd/even, +0%(+10%/+10%)) / Completion warning occur, 80%(90%/95%) jail detain opponent (2 times)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}gravity_destruction`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Gravity Destruction")
        .setThumbnail("https://i.imgur.com/kNXfcos.png")
        .addField("🔮 Ability","70%(75%) extra toll fee X4 when opponent lands at my area / passing opponent's area, 75%(80%) destroy opponent's area or remove paint")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}contributor_copycat_drone`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Little/Awaken) Contributor Copycat Drone")
        .setThumbnail("https://i.imgur.com/8QQtCDY.png")
        .addField("🔮 Ability","Opponent constructs landmark, 50%(38%/54%) construct landmark (empty area with same color first) / opponent arrives at me, 50%(40%/60%) get most expensive opponent's area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}spy_trap`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Spy Trap")
        .setThumbnail("https://i.imgur.com/Cp6pBw6.png")
        .addField("🔮 Ability","When turn ends, 60%(75%) add Spring Trap in wanted area (When anyone arrives at Spring Trap, teleport to Spring Trap's owner most expensive landmark) / Arrive at opponent's area, 75%(80%) exempt toll fee and go to nearest empty area in line (2 times)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}dark_bubble_gun`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Dark Bubble Gun")
        .setThumbnail("https://i.imgur.com/MWGpYfq.png")
        .addField("🔮 Ability","Opponent arrive at my landmark, 70%(80%) detain opponent / when opponents arrive at my area with sealed multiplier, 65%(70%) nullify exempt toll ability")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}doublewing_jetpack`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Doublewing Jetpack")
        .setThumbnail("https://i.imgur.com/DYImCJo.png")
        .addField("🔮 Ability","When my turn starts, 80%(90%) get exempt toll fee ability (2 times (3 times)) (Exempt toll fee: arrive at opponent's area at my turn, exempt toll fee) & 30% get double / double 3 times, 75%(85%) go to wanted area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}shield_drone`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Shield Generating Drone")
        .setThumbnail("https://i.imgur.com/cAD6Www.png")
        .addField("🔮 Ability","When turn starts, 70%(90%) create shield (stack to 1 shield) / When opponent create Black Hole, 70%(80%) switch Black Hole and White Hole position")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}landlord_teddy_bear`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Landlord Teddy Bear")
        .setThumbnail("https://i.imgur.com/1XX6Rrp.png")
        .addField("🔮 Ability","Extra toll fee 40%(50%) X total of my areas (up to 200% (up to 250%)) -> 40%(65%) apply Super Rip-Off Effect (Super Rip-Off: increase construction fee/acquire fee X2 (up to X16)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}completion_guardian_drone`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Completion Guardian Drone")
        .setThumbnail("https://i.imgur.com/h0F9Gtz.png")
        .addField("🔮 Ability","75%(80%) nullify destroy city or paint skill / completion warning occur, 90% Jail Detain opponents (2 times)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}titanium_helmet`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Titanium Helmet")
        .setThumbnail("https://i.imgur.com/mHEogSy.png")
        .addField("🔮 Ability","Dice Control 53%(54%) (2nd turn, +0%(+10%)) / 70%(90%) defend force move and catch skill (2 times)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}diamond_punch_gun`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Diamond Punch Gun")
        .setThumbnail("https://i.imgur.com/oyvHobE.png")
        .addField("🔮 Ability","When arrive/passing opponent, 45%(65%) push opponent to one of my area randomly and Jail Detain (not active, +10%) / 40%(75%) defend negative effect (Scarecrow Helmet, etc.)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}teleport_drawing`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Teleport Drawing Equipment")
        .setThumbnail("https://i.imgur.com/Zeq0xhA.png")
        .addField("🔮 Ability","Construct 3 buildings, 80%(90%) go to START (2 times) / Arrive/construct landmark, 30%(50%) teleport to Special Area/Corner Area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}corner_magnetic_core`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Corner Magnetic Core")
        .setThumbnail("https://i.imgur.com/b7pAPXU.png")
        .addField("🔮 Ability","Arrive at corner block, 70%(80%) choose my area to become Olympic area (upgraded to landmark) -> pull opponents in 4 blocks range ->  40%(75%) add `go to Olympic` card in Special Area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}spiderweb_catchbot`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Spider Web Catch Bot")
        .setThumbnail("https://i.imgur.com/9umaQYj.png")
        .addField("🔮 Ability","Opponents are using `teleport` skill, 30%(40%) send opponents to my standing position (not active, +10%(+35%)) / opponent arrives at me, 50%(75%) get most expensive opponent's area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}ultimate_defense_ring`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Ultimate Defense Ring")
        .setThumbnail("https://i.imgur.com/93ymCPa.png")
        .addField("🔮 Ability","Arrive at opponent's area, exempt toll fee (1 times (2 times)) / 75%(90%) defend opponent's attack + force pull")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}paint_roller`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Paint Roller Shoes")
        .setThumbnail("https://i.imgur.com/XCbGSDN.png")
        .addField("🔮 Ability","Arrive at opponent's landmark, 70%(75%) pay basic toll fee and paint landmark for 2 turns (2nd turn, +0%(+20%)) / arrive at opponent's area, 35%(60%) teleport in line")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}confinement_magnetic_core`){
        embed = new Discord.MessageEmbed()
        .setTitle("Confinement Magnetic Core")
        .setThumbnail("https://i.imgur.com/leEdyUN.png")
        .addField("🔮 Ability","Arrive/construct landmark, 90% pull opponents in 4 blocks range + Jail Detain\n\n*Jail Detain: When in Jail Detain, I will pay toll fee at my turn (after opponent's Jail Detain skill activated). During that, I can't acquire opponent's area or construct. During Jail Detain, my skill will not active*")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}spaceships_drawing`){
        embed = new Discord.MessageEmbed()
        .setTitle("Spaceships Drawing Equipment (Lite)")
        .setThumbnail("https://i.imgur.com/dXvHxbH.png")
        .addField("🔮 Ability","Construct 3 buildings, 45%(40%) go to standing position (not active, +10%) / Arrive at my area, 65%(40%) increase toll fee X2/X4/X8 at all of my area and sealed at that area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}magic_brush`){
        embed = new Discord.MessageEmbed()
        .setTitle("Magic Brush")
        .setThumbnail("https://i.imgur.com/40qT1hq.png")
        .addField("🔮 Ability","When get double, get 120% salary / arrive at opponent's landmark, 75% pay basic toll fee and paint landmark for 2 turns")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}punch_gloves`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Shining) Punch Gloves")
        .setThumbnail("https://i.imgur.com/uc8sc8S.png")
        .addField("🔮 Ability","When arrive/passing opponent, 50%(60%) push opponent to one of my area randomly and Jail Detain opponent (not active, +10%)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}bubble_shoes`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Shining) Bubble Shoes")
        .setThumbnail("https://i.imgur.com/siwm4m9.png")
        .addField("🔮 Ability","Arrive at my area, 45%(54%) all of my area's toll fee X2 and teleport to my another area and set Bubble Trap")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}protect_shoes`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Little) Protect Shoes")
        .setThumbnail("https://i.imgur.com/LF2KWD3.png")
        .addField("🔮 Ability","Arrive at opponent's area at my turn, 85% exempt toll and teleport to my another area (2 times (1 times), keep dice double) / arrive at my area, get 80% construction fee")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}keystone_badge`){
        embed = new Discord.MessageEmbed()
        .setTitle("Keystone Badge")
        .setThumbnail("https://i.imgur.com/lpOvIV5.png")
        .addField("🔮 Ability","80% defend force move opponent's attack (1 time) / arrive at opponent's area, 35% exempt toll -> all of my area's toll fee X2 (not active, +5%)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}sudim`){
        embed = new Discord.MessageEmbed()
        .setTitle("Super Dimension Drawing Equipment")
        .setThumbnail("https://i.imgur.com/o9BfNot.png")
        .addField("🔮 Ability","When construct, 38% upgrade landmark -> teleport to Special Area/Corner Area (not active, +10%)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}pirate_teddy_bear`){
        embed = new Discord.MessageEmbed()
        .setTitle("Pirate Teddy Bear")
        .setThumbnail("https://i.imgur.com/tZZaR34.png")
        .addField("🔮 Ability","Extra toll fee 200% / when opponents arrive at my area with sealed multiplier, 65% nullify exempt toll ability")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}controversial_copycat`){
        embed = new Discord.MessageEmbed()
        .setTitle("Controversial Copycat")
        .setThumbnail("https://i.imgur.com/SqdTYvk.png")
        .addField("🔮 Ability","Arrive at opponent's landmark, 75% exempt toll and upgrade one of my area to landmark and copy multiplied toll fee from opponent's landmark that I visit (2 times)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}copycat_drone`){
        embed = new Discord.MessageEmbed()
        .setTitle("Copycat Drone")
        .setThumbnail("https://i.imgur.com/5FlwSvE.png")
        .addField("🔮 Ability","Opponent constructs landmark, 50% construct landmark (empty area with same color first)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}jumping_draw`){
        embed = new Discord.MessageEmbed()
        .setTitle("Jumping Drawing Equipment")
        .setThumbnail("https://i.imgur.com/p7xBDqA.png")
        .addField("🔮 Ability","Construct 3 buildings, 80% go to standing position (2 times) / arrive at my area, 42% all of my area's toll fee X2 -> teleport to my another area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}black_dragon_ring`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Untransforming) Black Dragon Transformation Ring")
        .setThumbnail("https://i.imgur.com/WSoJOcV.png")
        .addField("🔮 Ability","When game starts, (without) transform into Black Dragon Mode -> get starting marble 155% and get Bubble Escape Pin skill")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}amor_party`){
        embed = new Discord.MessageEmbed()
        .setTitle("Amor Party Invitation Card")
        .setThumbnail("https://i.imgur.com/SzS2kyS.png")
        .addField("🔮 Ability","Arrive at my landmark, 75% call 1 random opponents by paying 70% toll fee / arrive at my area, get 70% construction fee")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}sky_town_plan`){
        embed = new Discord.MessageEmbed()
        .setTitle("Sky Town Plan")
        .setThumbnail("https://i.imgur.com/kj3BnaV.jpg")
        .addField("🔮 Ability","Roll dice, 33% choose block in dice range and teleport -> construct, upgrade all of my area in line to landmark")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}accurate_blackhole`){
        embed = new Discord.MessageEmbed()
        .setTitle("Accurate Black Hole Amplifier")
        .setThumbnail("https://i.imgur.com/oO9DicR.png")
        .addField("🔮 Ability","Arrive/construct landmark, 85% create Black Hole / arrive Black Hole, 75% teleport in line")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}bubble_escape_pin`){
        embed = new Discord.MessageEmbed()
        .setTitle("Bubble Escape Pin")
        .setThumbnail("https://i.imgur.com/O5qDGhQ.jpg")
        .addField("🔮 Ability","Arrive at opponent's area, 35% exempt toll -> all of my area's toll fee X2 / when detained, 80% destroy the bubble and remove the effect")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}titan_gauntlet`){
        embed = new Discord.MessageEmbed()
        .setTitle("Titan Gauntlet")
        .setThumbnail("https://i.imgur.com/zlP84df.png")
        .addField("🔮 Ability","Arrive/construct landmark, 76% create Black Hole -> install bubble detain")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}blackhole_warpbot`){
        embed = new Discord.MessageEmbed()
        .setTitle("Blackhole Warpbot")
        .setThumbnail("https://i.imgur.com/MHILKgY.png")
        .addField("🔮 Ability","Arrive/construct landmark, 85% create Black Hole / arrive Black Hole, 80% teleport to my area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}teddy_tarot_card`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Teddy Bear Tarot Card")
        .setThumbnail("https://i.imgur.com/SgcwZqB.png")
        .addField("🔮 Ability","When my first turn starts, open Item Shop")
        .addField("1","Completion warning occur, 95% Jail Detain Opponents (1 times (2 times)) / extra toll fee 200%","⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️")
        .addField("2","Opponent arrives at my landmark, 50%(75%) uncharge their skills (set limit skill to 0, can't racharge for 1 turn) / extra toll fee 200%","⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️")
        .addField("3","Passing opponent's area, 60%(80%) destroy opponent's area or remove paint / extra toll fee 200%","⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}shield_jetpack`){
        embed = new Discord.MessageEmbed()
        .setTitle("Awaken Shield Jetpack")
        .setThumbnail("https://i.imgur.com/ICd1iOS.png")
        .addField("🔮 Ability","When turn starts, 90% create shield (stack to 1 shield) / Arrive at opponent's area at my turn, 80% exempt toll (2 times) -> go to wanted area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}freedom_helmet`){
        embed = new Discord.MessageEmbed()
        .setTitle("Freedom Helmet")
        .setThumbnail("https://i.imgur.com/SAiBVQg.png")
        .addField("🔮 Ability","Dice control accuracy increased 54% (odd even growth +10%) / When my dice chance starts, 70% choose forward/backward then roll dice")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}space_pirate`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Space Pirate Drawing Equipment")
        .setThumbnail("https://i.imgur.com/up0lHob.png")
        .addField("🔮 Ability","Construct 3 buildings, 40%(50%) move to same place (inactive +10%(+15%) / Opponent arrive at my sealed area, 50%(75%) nullify toll fee exempt")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved`, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}`){
        embed = new Discord.MessageEmbed()
        .setTitle("")
        .setThumbnail("")
        .addField("🔮 Ability","")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}`){
        embed = new Discord.MessageEmbed()
        .setTitle("")
        .setThumbnail("")
        .addField("🔮 Ability","")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}`){
        embed = new Discord.MessageEmbed()
        .setTitle("")
        .setThumbnail("")
        .addField("🔮 Ability","")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}`){
        embed = new Discord.MessageEmbed()
        .setTitle("")
        .setThumbnail("")
        .addField("🔮 Ability","")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}`){
        embed = new Discord.MessageEmbed()
        .setTitle("")
        .setThumbnail("")
        .addField("🔮 Ability","")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }















    if(cmd === `${prefix}rena`){
        embed = new Discord.MessageEmbed()
        .setTitle("Idol/(Superstar) Rena")
        .setThumbnail("https://i.imgur.com/GJPW7ZY.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When construct, 80%(90%) create Concert Sign (Concert Sign: increase toll fee X3) / arrive at my area, 90% upgrade landmark -> 75%(80%) create Concert Sign for my area which has not Concert Sign or random blank area in order")
        .addField("🔰 skill 2","Opponent arrives at my area with Concert Sign, 67% nullify acquire, paint, exempt toll fee, dice double. (Concert Sign will disappear after opponent arrives at my area, bankrupt or ownership change)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}sid`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Sid 🚧")
        .setThumbnail("https://i.imgur.com/RhNxooE.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When construct, 70%(90%) install Under Construction sign in 2 blocks range front and back -> 0%(50%) teleport in line\nUnder Construction : when I arrive at that sign, pay 5x landmark construction fee to construct landmark, when opponent arrive at that sign, unable to construct (sign will disappear), also cannot remotely construct on installed area")
        .addField("🔰 skill 2","When turn starts, get 45% of all my area's construction fee / When arrive/passing opponent, 50%(65%) push opponent to one of my area randomly and Jail Detain\n\n*Jail Detain: When in Jail Detain, I will pay toll fee at my turn (after opponent's Jail Detain skill activated). During that, I can't acquire opponent's area or construct. During Jail Detain, my skill will not active*")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}dion`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Dion 🌱")
        .setThumbnail("https://i.imgur.com/YT1ROik.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When turn starts, 30%(50%) teleport to empty area / When construct, 25%(38%) plant Seed at one of my random area")
        .addField("🔰 skill 2","When construct, 50% fill Energy (up to 3) / When 3 Energies acquired, install Vine Garden at all of my areas\nVine Garden: 80% catch passing opponent, only for 1 turn")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}lulubel`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Lulubel 📡")
        .setThumbnail("https://i.imgur.com/5mtuXai.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at corner area, 65%(90%) create Laboratory\nLaboratory: when turn starts, choose 1 from 2 Fortune Cards (will disappear for 3 turns or if opponent create Laboratory at my block with Laboratory or if I create another Laboratory)\n- Spring Trap: add Spring Trap in any blocks\n- Remove Negative Effect: remove any negative effects that are applied to me")
        .addField("🔰 skill 2","Arrive at corner area, 60%(85%) choose area to become landmark and teleport to it and 50%(75%) create shield (stack to 1 shield)/  Arrive at my landmark, 60%(80%) roll dice (dice control 100%) and send 1 random opponent according to my dice range (toll fee X2 debuff)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}mnemion`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Mnemion")
        .setThumbnail("https://i.imgur.com/3g4r6zq.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When turn starts, 60%(90%) create Time Blessing in one of my area (up to 3 Time Blessing, can be destroyed, can't be created in one of my arrived area / Roll dice, 33%(38%) choose block in dice range and teleport\nTime Blessing: transform into Awakening Mode; Awakening Mode: improve skill to select area in front of and behind me by 60%(80%) / 60%(100%) nullify negative effect")
        .addField("🔰 skill 2","Arrive my area at my turn, 45%(60%) apply `Fiery Dice` and Jail Detain all of opponents in line / 60%(80%) get Steal City/ 100% Discount Card\nFiery Dice: Increase dice control's gauge speed by 3X")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}ren`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Ren")
        .setThumbnail("https://i.imgur.com/9Dx10iY.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at my landmark, 65%(80%) call all opponents in line to my landmark and give them X mark / When turn starts, 50%(75%) teleport in opponent with X mark's line")
        .addField("🔰 skill 2","Opponent constructs landmark, 50%(60%) construct landmark (empty area with same color first) / Opponent arrives at my area, 45%(65%) discharge their skills (set limit skill to 0, can't recharge for 1 turn)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}lilith`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Lilith")
        .setThumbnail("https://i.imgur.com/55QE9cq.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at my landmark, 70%(80%) roll dice (dice control 100%) and send 1 random opponent according to my dice range (toll fee X2 debuff) / 65%(80%) extra toll fee X4 when opponent lands at my area")
        .addField("🔰 skill 2","Opponents are using `teleport` skill, 35%(40%) send opponents to my standing position -> swap marble -> nullify paint/exempt toll fee skill (not active, +25%(+30%))")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}fey`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Fey")
        .setThumbnail("https://i.imgur.com/ZVGo9hC.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at my area, 70%(76%) teleport within 8 blocks range and if construct, upgrade landmark and force opponent in range to move")
        .addField("🔰 skill 2","Opponent arrives at my area, 65%(78%) make opponent choose 1 of 3 Debuff Menus + steal 30% opponent's marble\nDebuff Menu:\n1. Increase my acquire's fee X6 / when I pass my area, destroy my area or remove paint at my area\n2. Every constructs, increase construction fee (up to X16, no build discount/acquire discount) / when I pass my area, destroy my area or remove paint at my area\n3. Destroy 1 dice / when I pass my area, destroy my area or remove paint at my area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}nicole`){
        embed = new Discord.MessageEmbed()
        .setTitle("Nicole")
        .setThumbnail("https://i.imgur.com/BXizJis.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When turn starts, 100% makes Battery in one of my area / Arrive at my area with Battery, upgrade to landmark and go to my next area and push all of the opponents in path to my area + Jail Detain + get Dash Skill for 2 turns. Dash Skill: 70% extra toll fee X4 when opponent lands at my area / passing opponent's area, 80% destroy opponent's area or remove paint")
        .addField("🔰 skill 2","Arrive at my area, 68% makes Shield (protect all of opponent's attack including Scarecrow) (stacks up to 2 Shields)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}joey`){
        embed = new Discord.MessageEmbed()
        .setTitle("Joey")
        .setThumbnail("https://i.imgur.com/6V0Tpeb.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at my landmark, 75% call 1 random opponents by paying 70% toll fee -> get opponent most expensive's area")
        .addField("🔰 skill 2","Passing opponent, 60% steal 50% marble + transform opponent into Scarecrow Mode (Scarecrow Mode: 1. can't use skill, 2. only for 1 turn, will disappear even when enemy got double)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}ciel`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Ciel")
        .setThumbnail("https://i.imgur.com/UKLTVmB.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When game starts, get Construction Tools / get double, 58%(65%) get Construction Tools (Construction Tools: arrive empty city, create landmark -> create Stop Sign)")
        .addField("🔰 skill 2","35% get double / double 3 times, 78%(85%) go to wanted area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}bolang`){
        embed = new Discord.MessageEmbed()
        .setTitle("Bihyungnang / Bolang")
        .setThumbnail("https://i.imgur.com/scdqGoI.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at my landmark, 65% choose area to become landmark and teleport to it and 50% get Charge Fortune Card (charge my skills)")
        .addField("🔰 skill 2","Arrive at opponent's landmark, 80% exempt toll and paint opponent's landmark (2 turns) (2 times) / 70% nullify destroy city or paint ability")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}rock_star_queen`){
        embed = new Discord.MessageEmbed()
        .setTitle("Rock Star Queen")
        .setThumbnail("https://i.imgur.com/Fu2ViEM.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Dice control 54% (2nd turn, +7%) / 90% defend force move opponent's attack (2 times)")
        .addField("🔰 skill 2","Construct, 70% paying 10X construction fee to upgrade landmark / construct landmark, 50% teleport to my area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}hanbok_lucia`){
        embed = new Discord.MessageEmbed()
        .setTitle("Hanbok Lucia 🧲")
        .setThumbnail("https://i.imgur.com/uDJKyyV.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Construct 3 buildings, 45% go to standing position (not active, +15%) / 60% nullify destroy city or paint skill")
        .addField("🔰 skill 2","Arrive/construct landmark, 90% hold Olympic (upgrade landmark if not landmark) and pull opponents in 4 blocks range (70% nullify defense)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}amber`){
        embed = new Discord.MessageEmbed()
        .setTitle("Amber")
        .setThumbnail("https://i.imgur.com/3XsY4qU.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at Corner Block, 90% shoot Water Stream to selected area in line")
        .addField("🔰 skill 2","Arrive at my area, 80% increase all of my area's toll fee X2/X4/X8 and sealed at my arrived area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}caren`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Caren")
        .setThumbnail("https://i.imgur.com/r0sBo3U.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Dice control 54%(55%) (odd/even, +10%) / passing opponents, 60%(70%) transform opponent into Scarecrow Mode")
        .addField("🔰 skill 2","Opponent constructs landmark, 45%(60%) construct landmark (empty area with same color first) / completion warning occur, 80%(90%) Jail Detain opponents (2 times)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}nirvana`){
        embed = new Discord.MessageEmbed()
        .setTitle("Awaken Nirvana")
        .setThumbnail("https://i.imgur.com/nXxpT0S.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Construct, 36% add random landmark")
        .addField("🔰 skill 2","Extra toll fee 60% X my area's total (up to 300%) / 60% nullify destroy city or paint skill")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}jeonwoochi`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Jeonwoochi")
        .setThumbnail("https://i.imgur.com/WRhUHep.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive/construct landmark, 80%(90%) create Shadow at that landmark / arrive at landmark with my Shadow, 75%(80%) pull opponent to my landmark")
        .addField("🔰 skill 2","Arrive at opponent's area, 50% exempt toll fee and go to my area with Shadow randomly (First Shadow: 300% extra toll fee, +100% every shadow)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}ra`){
        embed = new Discord.MessageEmbed()
        .setTitle("Ra")
        .setThumbnail("https://i.imgur.com/2Hxje9m.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Construct, 45% upgrade landmark (not active, +15%) -> teleport to my area")
        .addField("🔰 skill 2","Arrive at my landmark, 75% call 1 random opponents by paying 70% toll fee / Opponent constructs landmark, 60% construct landmark (empty area with same color first)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}zaha`){
        embed = new Discord.MessageEmbed()
        .setTitle("Zaha")
        .setThumbnail("https://i.imgur.com/JH7AnzY.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at area with building, 75% fill Orb Energy (up to 3) & teleport to opponent's position / arrive at opponents with 3 Orbs, 100% destroy all opponent's marble and get exempt toll fee ability at my turn")
        .addField("🔰 skill 2","When turn starts, 50% teleport to specific locations (0 Orb = 1 line, 1 Orb = 2 line, 2 Orb = 3 line, 3 Orb = all line) (not active, +15%)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}misty`){
        embed = new Discord.MessageEmbed()
        .setTitle("Misty")
        .setThumbnail("https://i.imgur.com/hMiFJsj.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When turn finishes, 85% select wanted area in other lines and can choose either wanted area then/or roll dice in next turn / passing opponent's area, 75% destroy opponent's area or remove paint")
        .addField("🔰 skill 2","Arrive at opponent's area, get 3X salary / Arrive at opponent's area, 35% exempt toll and go to nearest empty area in line")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}dark_antoinette`){
        embed = new Discord.MessageEmbed()
        .setTitle("Dark Antoinette")
        .setThumbnail("https://i.imgur.com/x4vZOmS.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Construct, 65% paying 10X construction fee to upgrade landmark")
        .addField("🔰 skill 2","When turn starts, open Item Shop / increase starting marble 100%\nItem Shop (will available every 2 turns):\n1. Passing START, get 5X salary + Angel/50% Discount (Free)\n2. Arrive/construct landmark, 90% pull opponents in line + get opponent's expensive area (3M)\n3. Arrive opponent's landmark, 90% exempt toll and paint opponent's landmark (2 turns) (1 time) (5M)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}athena`){
        embed = new Discord.MessageEmbed()
        .setTitle("Athena")
        .setThumbnail("https://i.imgur.com/kXDnLv5.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive corner area, 75% pull opponents who in line -> I teleport to that area / arrive at opponent, 50% destroy 1 opponent's dice (1 turn)")
        .addField("🔰 skill 2","Construct 3 buildings, 35% go to standing position (not active, +10%) / construct landmark, 65% teleport to Special Area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}lucia`){
        embed = new Discord.MessageEmbed()
        .setTitle("Lucia 🧲")
        .setThumbnail("https://i.imgur.com/j4dtTFL.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive at my area, 48% all of my area's toll fee X2 -> teleport to my another area")
        .addField("🔰 skill 2","Arrive/construct landmark, 90% hold Olympic (upgrade landmark if not landmark) and pull opponents in 4 blocks range (50% nullify defense)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

if(cmd === `${prefix}new_rolland`){
        embed = new Discord.MessageEmbed()
        .setTitle("[Renewal] Rolland")
        .setThumbnail("https://i.imgur.com/QwHrVrn.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When turn starts, 60% teleport to opponent's standing and 90% get opponent's most expensive area")
        .addField("🔰 skill 2","Arrive at opponent's landmark, 90% exempt toll and paint opponent's landmark (2 turns) (2 times) / Arrive at my landmark, 50% get Charge Fortune Card")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}asha`){
        embed = new Discord.MessageEmbed()
        .setTitle("(Awaken) Asha")
        .setThumbnail("https://i.imgur.com/XGnFPOA.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive to opponent in my turn, 65%(90%) send opponent to my selected landmark -> I teleport to same landmark / Arrive at my area, 45%(75%) create shield (stack to 2 shield)")
        .addField("🔰 skill 2","Arrive at constructed area, 60%(80%) throw chakram (steal 30% of opponent's marble) at random opponent then select to teleport at opponent's standing, then force blackout at arrived area (ignore opponent's wrong guide book, donation, marble stealing, etc.)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}post_leblanc`){
        embed = new Discord.MessageEmbed()
        .setTitle("Post Officer Le Blanc")
        .setThumbnail("https://i.imgur.com/4HIwP8I.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","When my turn starts, 20% teleport to empty area and select to move forward / backward then roll dice")
        .addField("🔰 skill 2","When my turn starts, 75% generate notice letter at opponents area randomly")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}muse`){
        embed = new Discord.MessageEmbed()
        .setTitle("[Renewal] Muse")
        .setThumbnail("")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive opponent's area at my turn, 85% exempt toll fee and go to wanted area (2 times) / Arrive opponent's area at my turn, 35% get 100% Discount Card")
        .addField("🔰 skill 2","When get double, 60% get `exempt toll fee and landmark destination` effect / double 3 times, 80% go anywhere")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}new_sophie`){
        embed = new Discord.MessageEmbed()
        .setTitle("[Renewal] Sophie")
        .setThumbnail("https://i.imgur.com/ar80rl0.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Dice control 53% (use odd even +15%) / When uses world travel, 50% roll dice again")
        .addField("🔰 skill 2","When passing world travel block by dice or fortune card in my turn, 60% exempt toll fee and immediately use world travel and apply buff : When construct 3 buildings, 80% go to START and install `move to corner block` fortune card at all map special blocks (1 time)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}thetis`){
        embed = new Discord.MessageEmbed()
        .setTitle("Thetis")
        .setThumbnail("https://i.imgur.com/9KPWulp.png")
        .addField("🔰 skill 1","When Construct, 30% randomly teleport to empty area then get 1x auto construct landmark effect")
        .addField("🔰 skill 2","75% defend force move skills and movement catching and checkpoint skills (2 times)")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babelianrr · Copyright © 2020 Legna · All rights reserved `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }

    if(cmd === `${prefix}champ_athena`){
        embed = new Discord.MessageEmbed()
        .setTitle("Champion Athena")
        .setThumbnail("https://i.imgur.com/3HrijbN.png")
        .setColor("#e834eb")
        .addField("🔰 skill 1","Arrive corner area, 80% pull opponents who in line -> I teleport to that area / arrive at opponent, 60% destroy 1 opponent's dice (1 turn)")
        .addField("🔰 skill 2","Arrive corner area, 75% hold Olympic (upgrade landmark if not landmark) and pull opponents in 4 blocks range / construct landmark, 60% teleport to Special Area")
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`Rena Bot · Translated by Babeliann · Copyright © 2020 Legna · All rights reserved  `, 'https://i.imgur.com/d7t6HZc.png');
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 15000}))
    }
  
  
    const verificationLevels = ['None ,(^.^),', 'Low ┬─┬ ノ( ゜-゜ノ)', 'Medium ヽ(ຈل͜ຈ)ﾉ︵ ┻━┻ ', 'High (╯°□°）╯︵ ┻━┻', 'Extreme ┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻'];
  
    const dateFormat = require('dateformat');
    const date = new Date();
    dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
  
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const days = millis / 1000 / 60 / 60 / 24;
  
  
    const owner = message.guild.owner.user || {};

    if(cmd === `${prefix}info`){
        embed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle("Info Server")
        .setDescription(`- [Dashboard](https://top.gg/bot/721354719746064445)
				- [Invite Link](https://discordapp.com/api/oauth2/authorize?response_type=code&client_id=${bot.user.id}&permissions=485846102&scope=bot)
				- [Facebook](https://www.facebook.com/mvpzlegna/)
				- [Bot Support Server](https://top.gg/bot/721354719746064445)
					${bot.user.username} is a fully customizable about ModooMarble. Rena comes fully packed with a wide range of commands, an advanced moderation system and an extensive logging system. These features are highly customizable and easy to setup but there's no point me just telling you so come and find out for yourself.`)
        .setThumbnail(message.guild.iconURL({ dynamic : true, size : 1024 }))
        .setFooter(`requested by ${message.author.username}#${message.author.discriminator} · Copyright © 2020 Rena · All rights reserved `, message.author.avatarURL)
        .setTimestamp()
        .setColor('#00FFFF')
        .addField('Server Name', message.guild.name, true)
        .addField('Server ID', message.guild.id, true)
        .addField('Owner',`${owner.username + "#" + owner.discriminator || '� Owner not found...'}`,true)
        .addField('Owner ID', `${owner.id || '� Owner not found...'}`,true)
        .addField('Created On',`${dateFormat(message.guild.createdAt)}`, true)
        .addField('Days Since Creation', `${days.toFixed(0)}`, true)
        .addField('Region',`${message.guild.region}`, true)
        //.addField('Verification Level',`${verificationLevels[message.guild.verificationLevel]}`,true)
        .addField('Bot', `${message.guild.members.cache.filter(m => m.user.bot).size}`,true)
        .addField('Text Channels',`${message.guild.channels.cache.filter(m => m.type === 'text').size}`,true)
        .addField('Voice Channels',`${message.guild.channels.cache.filter(m => m.type === 'voice').size}`,true)        
        .addField('Members', `${message.guild.members.cache.filter(m => m.presence.status !== 'offline').size} / ${message.guild.memberCount}`,true)
        .addField('Roles',`${message.guild.roles.cache.size}`,true)
        message.channel.send({ embed: embed })//.then(m => m.delete({timeout: 8000}))
      
      
      
      
      
      
      
      
      
      
      
      
      
    }

  

  
})
  
  
  
  
 


  
bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "text");
    let prefix = "!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice[1];
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
 
    const serverQueue = queue.get(message.guild.id);

    if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
      skip(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}volume`)) {
      volume(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}np`)) {
      np(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}queue`)) {
      Queue(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}pause`)) {
      pause(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}resume`)) {
      resume(message, serverQueue);
      return;
    } else if (message.content.startsWith(`${prefix}drop`)) {
      drop(message, serverQueue);
      return;
    //} else if (message.content.startsWith(`${prefix}lyrics`)) {
      //lyrics(message, serverQueue);
     // return;
    }
  });

  async function execute(message, serverQueue) {
    const args = message.content.trim().split(/ +/g);
    
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      ).then(m => m.delete({timeout: 5000}));
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
      
    }

    let song;
if (ytdl.validateURL(args[1])) {
  const songInfo = await ytdl.getInfo(args[1]);
  song = {
    title: songInfo.title,
    url: songInfo.video_url
  };
} else {
  const {videos} = await yts(args.slice(1).join(" "));
  if (!videos.length) return message.channel.send("No songs were found!");
  song = {
    title: videos[0].title,
    url: videos[0].url
  };
}

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
      
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`).then(m => m.delete({timeout: 6000}));
    }
  }

  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }

  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");
    
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    
    const stopped = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription("Music Stopped!")

message.channel.send(stopped)
  }

  function volume(message, serverQueue) {
    if(!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to using volume")
    if(!serverQueue)
      return message.channel.send(
        "There is nothing playing")
    const args = message.content.trim().split(/ +/g);
    if(!args[1]) return message.channel.send(`That volume is: **${serverQueue.volume}**`)
    if(isNaN(args[1])) return message.channel.send("That is not a valid amount to change the volume to")
    serverQueue.volume = args[1]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
    message.channel.send(`I have changed the volume to: **${args[1]}**`).then(m => m.delete({timeout: 10000}))
  }
  function np(message, serverQueue) {
    if(!serverQueue) return message.channel.send("There is nothing playing")
    const embed = new MessageEmbed()
    .setThumbnail(serverQueue.songs[0].thumbnail)
    .setDescription(`Now playing: **${serverQueue.songs[0].title}**`)
    message.channel.send(embed)
      .then(m => m.delete({timeout: 15000}))
  }
  function Queue(message, serverQueue) {
    if(!serverQueue) return message.channel.send("There is nothing playing")
    message.channel.send(`
__**Song Queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now Playing:** ${serverQueue.songs[0].title}`, { split: true })
  }

  function pause(message, serverQueue) {
    if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use the pause")
    if(!serverQueue) return message.channel.send("There is nothing playing")
    if(serverQueue && !serverQueue.playing) return message.channel.send("The music is already paused")
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause(true);
    message.channel.send("I have now paused the music for you");
    
  }
  
  function resume(message, serverQueue) {
    if(!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use the resume")
    if(!serverQueue) return message.channel.send("There is nothing playing")
    if(serverQueue && serverQueue.playing) return message.channel.send("The music is already playing")
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.channel.send("I have now resumed the music for you");
    
  }
  
  function lyrics(message, serverQueue) {  
    const queue = message.client.queue.get(message.guild.id);                                    
    if (!queue) return message.channel.send("There is nothing playing.")

    let lyrics = null;

    try {
      lyrics = lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`${queue.songs[0].title} — Lyrics`)
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }






 








  function drop(message, serverQueue) {
      let embed = new MessageEmbed();
    const args = message.content.trim().split(/ +/g);
    const { channel } = message.member.voice;
    if (!channel) {
      embed.setAuthor("YOU ARE NOT IN VOICE CHANNEL");
      return message.channel.send(embed)
    }

    if (!serverQueue) {
      embed.setAuthor("The Queue is empty");
      return message.channel.send(embed)
    }
    if(!args[0]) {
      embed.setAuthor(`Please Give The Song Number`)
      return message.channel.send(embed)
    }
    !serverQueue.songs.splice((parseInt(args[1]) || 1) - 1, 1);
    const song = serverQueue.songs.splice((parseInt(args[1]) || 1) - 1, 1);
    embed.setDescription(`${message.author} ❌ song removed from the queue.`)
    embed.setThumbnail(bot.user.displayAvatarURL())
    return message.channel.send(embed)
}




  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    
     let npmin = Math.floor(song.times / 60);
     let npsec = song.times - npmin * 60
     let np = `${npmin}:${npsec}`.split(' ')
     
     
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url, ytdlOptions, {filter: 'audioonly', quality: 'highestaudio', type: 'opus'}))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
                   const time = serverQueue.connection.dispatcher.streamTime;
                   const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle('Now Playing\n')
                    .setThumbnail(song.thumbnail)
                    .setTimestamp()
                    .setDescription(`🎵 Now playing:\n **${song.title}** 🎵\n${song.url}\n\n`)  //${np}
                    .setFooter(bot.user.username, bot.user.displayAvatarURL())
                serverQueue.textChannel.send(embed);


}

  
  

  
  
  
  
  

bot.on("message", async message => {
    if (message.channel.type == "dm")
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'suit') {
        let replies = ['batu', 'kertas', 'gunting'];
        let result = Math.floor((Math.random() * replies.length));

        let uReply = args[0];
        if (!uReply) return message.channel.send(`ketik !suit untuk bermain suit bersama Rena dan ketik salah satu sebagai berikut: \ncontoh : !suit kertas\n\`${replies.join(', ')}\``).then(m => m.delete({timeout: 8000}));
        if (!replies.includes(uReply)) return message.channel.send(`Coba pilih antara ini: \`${replies.join(', ')}\``)

        if (replies[result] === uReply) {
            console.log(replies[result]);
            return message.channel.send('😅 wah kita sama~').then(m => m.delete({timeout: 8000}));
        } else if (uReply === 'batu') {
            console.log(replies[result]);
            if (replies[result] === 'kertas') return message.channel.send('🤚 Sayang sekali, aku pemenangnya~!').then(m => m.delete({timeout: 8000}));
            else return message.channel.send('✌️ Senpai menang~!').then(m => m.delete({timeout: 8000}));
        } else if (uReply === 'gunting') {
            console.log(replies[result]);
            if (replies[result] === 'batu') return message.channel.send('✊ Sayang sekali, aku pemenangnya~!').then(m => m.delete({timeout: 8000}));
            else return message.channel.send('🤚 Senpai menang~!').then(m => m.delete({timeout: 8000}));
        } else if (uReply === 'kertas') {
            console.log(replies[result]);
            if (replies[result] === 'gunting') return message.channel.send('✌️ Sayang sekali, aku pemenangnya~!').then(m => m.delete({timeout: 8000}));
            else return message.channel.send('✊ Senpai menang~!').then(m => m.delete({timeout: 8000}));
        }
    }

})






  

bot.on("channelDelete", (channel) => {
    if(channel.parentID == channel.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {
        const person = channel.guild.members.cache.find((x) => x.id == channel.name)

        if(!person) return;

        let yembed = new discord.MessageEmbed()
        .setAuthor("MAIL DELETED", bot.user.displayAvatarURL())
        .setColor('RED')
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription("Your mail is deleted by moderator and if you have any problem with that han you can open mail again by sending message here.")
    return person.send(yembed)
    
    }


})


bot.on("message", async message => {
  if(message.author.bot) return;

  let args = message.content.slice(prefix.length).split(' ');
  let command = args.shift().toLowerCase();


  if(message.guild) {
      if(command == "setup") {
          if(!message.member.hasPermission("ADMINISTRATOR")) {
              return message.channel.send("You need Admin Permissions to setup the modmail system!")
          }

          let role = message.guild.roles.cache.find((x) => x.name == "SUPPORTER")
          let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")

          if(!role) {
              role = await message.guild.roles.create({
                  data: {
                      name: "SUPPORTER",
                      color: "GREEN"
                  },
                  reason: "Role needed for ModMail System"
              })
          }

          await message.guild.channels.create("MODMAIL", {
              type: "category",
              topic: "All the mail will be here :D",
              permissionOverwrites: [
                  {
                      id: role.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  }, 
                  {
                      id: everyone.id,
                      deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  }
              ]
          })


          return message.channel.send("Setup is Completed :D")

      } else if(command == "close") {


        if(message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "MODMAIL").id) {
            
            const person = message.guild.members.cache.get(message.channel.name)

            if(!person) {
                return message.channel.send("I am Unable to close the channel and this error is coming because probaly channel name is changed.")
            }

            await message.channel.delete()

            let yembed = new discord.MessageEmbed()
            .setAuthor("MAIL CLOSED", bot.user.displayAvatarURL())
            .setColor("RED")
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter("Mail is closed by " + message.author.username)
            if(args[0]) yembed.setDescription(args.join(" "))

            return person.send(yembed)

        }
      } else if(command == "open") {
          const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")

          if(!category) {
              return message.channel.send("Moderation system is not setuped in this server, use " + prefix + "setup")
          }

          if(!message.member.roles.cache.find((x) => x.name == "SUPPORTER")) {
              return message.channel.send("You need supporter role to use this command")
          }

          if(isNaN(args[0]) || !args.length) {
              return message.channel.send("Please Give the ID of the person")
          }

          const target = message.guild.members.cache.find((x) => x.id === args[0])

          if(!target) {
              return message.channel.send("Unable to find this person.")
          }


          const channel = await message.guild.channels.create(target.id, {
              type: "text",
            parent: category.id,
            topic: "Mail is Direct Opened by **" + message.author.username + "** to make contact with " + message.author.tag
          })
          const discord = require("discord.js")
          let nembed = new discord.MessageEmbed()
          .setAuthor("DETAILS", target.user.displayAvatarURL({dynamic: true}))
          .setColor("BLUE")
          .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
          .setDescription(message.content)
          .addField("Name", target.user.username)
          .addField("Account Creation Date", target.user.createdAt)
          .addField("Direct Contact", "Yes(it means this mail is opened by a supporter)");

          channel.send(nembed)

          let uembed = new discord.MessageEmbed()
          .setAuthor("DIRECT MAIL OPENED")
          .setColor("GREEN")
          .setThumbnail(bot.user.displayAvatarURL())
          .setDescription("You have been contacted by Supporter of **" + message.guild.name + "**, Please wait until he send another message to you!");
          
          
          target.send(uembed);

          let newEmbed = new discord.MessageEmbed()
          .setDescription("Opened The Mail: <#" + channel + ">")
          .setColor("GREEN");

          return message.channel.send(newEmbed);

      }
  }


   if(message.channel.parentID) {

    const category = message.guild.channels.cache.find((x) => x.name == "MODMAIL")
    
    if(message.channel.parentID == category.id) {
        let member = message.guild.members.cache.get(message.channel.name)
    
        if(!member) return message.channel.send('Unable To Send Message')
        const discord = require("discord.js")
        let lembed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(message.content)
    
        return member.send(lembed)
    }
    
    
      } 
  
  
  

  
  
  if(!message.guild) {
      const guild = await bot.guilds.cache.get(ServerID);
      if(!guild) return;

      const main = guild.channels.cache.find((x) => x.name == message.author.id)
      const category = guild.channels.cache.find((x) => x.name == "MODMAIL")
      const discord = require("discord.js")

      if(!main) {
          let mx = await guild.channels.create(message.author.id, {
              type: "text",
              parent: category.id,
              topic: "This mail is created for helping  **" + message.author.tag + " **"
          })

          let sembed = new discord.MessageEmbed()
          .setAuthor("MAIN OPENED")
          .setColor("GREEN")
          .setThumbnail(bot.user.displayAvatarURL())
          .setDescription("Conversation is now started, you will be contacted by supporters soon :D")

          message.author.send(sembed)


          let eembed = new discord.MessageEmbed()
          .setAuthor("DETAILS", message.author.displayAvatarURL({dynamic: true}))
          .setColor("BLUE")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          .setDescription(message.content)
          .addField("Name", message.author.username)
          .addField("Account Creation Date", message.author.createdAt)
          .addField("Direct Contact", "No(it means this mail is opened by person not a supporter)")


        return mx.send(eembed)
      }
      
      let xembed = new discord.MessageEmbed()
      .setColor("YELLOW")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(message.content)


      main.send(xembed)
  }
  
})










bot.on("ready", () => {
  console.log("Watching " + CHANNEL_ID.length  + " Channels")
})

const notifier = new YouTubeNotifier({
  hubCallback: 'https://necessary-probable-slouch.glitch.me/yt',
  secret: 'JOIN_MY_SERVER_OR_DIE'
});


notifier.on('notified', data => {
  console.log('New Video');
  bot.channels.cache.get(SERVER_CHANNEL_ID).send(
    `**${data.channel.name}** just uploaded a new video\nVideo: ${data.channel.title},Link: ${data.channel.link} - **${data.video.link}**`
  );
});
 
notifier.subscribe(CHANNEL_ID);

app.use("/yt", notifier.listener());








  









const  CanvasSenpai  = require("./src/canva.js")
const canva = new CanvasSenpai();


bot.on("guildMemberAdd", async member => {
    const Channel = member.guild.channels.cache.find(channel => channel.name === '╭🏠・welcome')
    if (!Channel) return;
   let data = await canva.welcome(member, { link: "https://wallpaperaccess.com/full/87215.jpg", blur: true })
 
    const attachment = new Discord.MessageAttachment(
      data,
      "welcome-image.png"
    );


  
    Channel.send(`🎉 Selamat datang ${member} di server **${member.guild.name}** 🥂\nkamu adalah member ke ${member.guild.memberCount} disini, mohon baca peraturan di channel <#723480344824905758> ya, semoga kamu betah~ 😍\n\n`, attachment)

    member.send(`🎉 Selamat datang senpai ${member} di server **${member.guild.name}** 🥂 \nkamu member ke ${member.guild.memberCount}, kalau ingin tau tentang Rena ketik !help disini atau dichannel <#723927175945912391> dan jangan lupa baca peraturan di <#723480344824905758> ya senpai~ 💖`)
    member.roles.add("736827594959487028")
    
})


bot.on('message', async message => {
    if (message.content === '!join') {
        bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});






bot.on("guildMemberRemove", member => {
    const Channel = member.guild.channels.cache.find(channel => channel.name === 'goodbye')

    Channel.send(`${member.user.tag} telah meninggalkan **${member.guild.name}** 😭, semoga kita bertemu lagi~ 😢`);
})






  
































bot.login("OTAyMTUxODcwMTYyODIxMTYx.YXaQZw.mv9Vxp-nUVm8T4rkIkASSpauBIs");
