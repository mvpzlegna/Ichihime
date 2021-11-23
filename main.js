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
const { Client, Intents } = require('discord.js');
const bot = new Discord.Client({
  disableMentions: "everyone",
  partials: ["REACTION"],
  intents: [Intents.FLAGS.GUILDS] 
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
      targetGuild = bot.guilds.cache.get('747108016230367332')
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
    message.reply(`Welcome back ${message.author.tag}, AFK sudah dicabut, selamat beraktifitas`);
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
 )
    
}
})

  
  




bot.on("message", async message => {
  let prefix = "!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice[1];
  
  const dateFormat = require('dateformat');
  const date = new Date();
  dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');

  const millis = new Date().getTime() - message.guild.createdAt.getTime();
  const days = millis / 1000 / 60 / 60 / 24;


  //const //owner = //await //message.guild.members.fetch(message.guild.owner);

  const owner = message.guild.owner.user

  //const verificationLevels = ['None ,(^.^),', 'Low ┬─┬ ノ( ゜-゜ノ)', 'Medium ヽ(ຈل͜ຈ)ﾉ︵ ┻━┻ ', 'High (╯°□°）╯︵ ┻━┻', 'Extreme ┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻'];

  if(cmd === `${prefix}info`){
      embed = new Discord.MessageEmbed()
      .setAuthor(bot.user.username, bot.user.displayAvatarURL())
      .setTitle("Info Server")
      .setDescription(`- [Dashboard](https://top.gg/bot/721354719746064445)
      - [Invite Link](https://discordapp.com/api/oauth2/authorize?response_type=code&client_id=${bot.user.id}&permissions=485846102&scope=bot)
      - [Facebook](https://www.facebook.com/mvpzlegna/)
      - [Bot Support Server](https://top.gg/bot/721354719746064445)
        ${bot.user.username} is a fully customizable about server Mahjong Soul MONSTER.`)
      .setThumbnail(message.guild.iconURL({ dynamic : true, size : 1024 }))
      .setFooter(`requested by ${message.author.username}#${message.author.discriminator} · Copyright © 2020 Legna · All rights reserved `, message.author.avatarURL)
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
        message.reply('kyaaaa~❤️', {files: ['https://i.imgur.com/qsh1amC.jpg']}).then(m => m.delete({timeout: 5000}))
    }
    if(cmd === `${prefix}uptime`){
        message.channel.send(`uptime ku sudah \`${ms(bot.uptime, { long: true })}\` senpai!✨`).then(m => m.delete({timeout: 5000}))
    }

    if(cmd === `${prefix}utc`){
      message.channel.send(`waktu server MahjongSoul[EN] adalah \`${moment().utcOffset(-7).format("MMMM Do YYYY, HH:mm:ss a")}\` \nwaktu Jakarta adalah \`${moment().format('MMMM Do YYYY, HH:mm:ss a')}\``)//.then(m => m.delete({timeout: 5000}))
  }

  if(cmd === `${prefix}jst`){
    message.channel.send(`waktu server MahjongSoul[JP] adalah \`${moment().utcOffset(+9).format("MMMM Do YYYY, HH:mm:ss a")}\` \nwaktu Jakarta adalah \`${moment().format('MMMM Do YYYY, HH:mm:ss a')}\``)//.then(m => m.delete({timeout: 5000}))
}
  
  
      if(cmd === `${prefix}test`){
        embed = new Discord.MessageEmbed()
        //.setAuthor(message.author.username, message.author.displayAvatarURL())
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setDescription("🔞test list command")
        //.setImage("https://i.imgur.com/6W4UF4r.png")
        .setColor("#8034eb")
        .addField("✨·test",'test\n\n\n', true)
        .addField("🔞·test",'test\n\n\n', true)
        .addField("`🚨attention🚨`","⚠️ **informasi lebih lanjut hubungi** <@&817216242191433738><@817216242191433738>")
        .setFooter(`requested by ${message.author.username}#${message.author.discriminator} · Copyright © 2020 Ichihime · All rights reserved`, 'https://i.imgur.com/ay4f4ha.png')
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
        .addField("Card","!champ_athena\n!thetis\n!new_sophie\n!muse\n!post_leblanc\n!asha\n!sid\n!dion\n!lulubel\n!mnemion\n!ren\n!lilith\n!fey\n!nicole\n!joey\n!ciel\n!bolang\n!rock_star_queen\n!Ichihime\n!hanbok_lucia\n!amber\n!caren\n!nirvana\n!jeonwoochi\n!ra\n!zaha\n!misty\n!dark_antoinette\n!athena\n!lucia\n!new_rolland", true)
        .addField("Pendant","!space_pirate\n!blackhole_warpbot\n!titan_gauntlet\n!paint_roller\n!shield_jetpack\n!teddy_tarot_card\n!ninja_shoes\n!scarecrow_helmet\n!ironwall_helmet\n!diamond_punch_gun\n!pumpkin_helmet\n!gravity_destruction\n!contributor_copycat_drone\n!spy_trap\n!dark_bubble_gun\n!doublewing_jetpack\n!shield_drone\n!landlord_teddy_bear\n!completion_guardian_drone\n!titanium_helmet\n!teleport_drawing\n!corner_magnetic_core\n!spiderweb_catchbot\n!ultimate_defense_ring\n!confinement_magnetic_core\n!spaceships_drawing\n!magic_brush\n!punch_gloves\n!bubble_shoes\n!protect_shoes\n!keystone_badge\n!sudim\n!pirate_teddy_bear\n!controversial_copycat\n!copycat_drone\n!jumping_draw\n!black_dragon_ring\n!amor_party\n!sky_town_plan\n!accurate_blackhole\n!bubble_escape_pin\n", true)
        .addField("⬇️⬇️_⚠️ attention ⚠️_⬇️⬇️","`please have some respect the work of the maker by not sharing it outside the source. violating this warning will incur applicable penalty`")
        .setFooter(`requested by ${message.author.username}#${message.author.discriminator} · Copyright © 2020 Ichihime · All rights reserved` + message.author.id, 'https://i.imgur.com/d7t6HZc.png')
        .setTimestamp();
        message.channel.send({ embed: embed }).then(m => m.delete({timeout: 20000}))
    }
    
    if(cmd === `${prefix}help`){
        embed = new Discord.MessageEmbed()
        //.setAuthor(message.author.username, message.author.displayAvatarURL())
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setTitle("List channel server Mahjong Soul MONSTER Indonesia")
        .setDescription("hi senpai~, ada yang bisa Ichihime bantu?")
        //.setImage("https://i.imgur.com/6W4UF4r.png")
        .setColor("#8034eb")
        .addField("General Command",'**!list**\n`gunakan !list di channel `<#729716738203320340>\n\n**!ping**\n\n**!suit**\n\n**!report** <tag member> <isi laporan>\n\n\n', true)
        .addField("Music Command",'**!play**\n`gunakan !play beserta judul/linknya di channel `<#723541759816368241>\n\n**!skip**\n\n**!pause**\n\n**!resume**\n\n**!stop**\n\n**!queue**\n\n\n', true)
        .addField("`🚨attention🚨`","⚠️ **informasi lebih lanjut hubungi** <@&723360791163568221><@&723356393272377465>")
        .setFooter(`requested by ${message.author.username}#${message.author.discriminator} · Copyright © 2020 Ichihime · All rights reserved`, 'https://i.imgur.com/ay4f4ha.png')
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
    } else if (message.content.startsWith(`${prefix}lyrics`)) {
      lyrics(message, serverQueue);
      return;
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
    const lyricsFinder = require('lyrics-finder');                            
    if (!serverQueue) return message.channel.send("There is nothing playing.")

    let lyrics = null;

    try {
      lyrics = lyricsFinder(serverQueue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${serverQueue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${serverQueue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`${serverQueue.songs[0].title} — Lyrics`)
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
        if (!uReply) return message.channel.send(`ketik !suit untuk bermain suit bersama mamank Gian dan ketik salah satu sebagai berikut: \ncontoh : !suit kertas\n\`${replies.join(', ')}\``).then(m => m.delete({timeout: 8000}));
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
        
        const discord = require("discord.js")
        let yembed = new discord.MessageEmbed()
        .setAuthor("MAIL DELETED", bot.user.displayAvatarURL())
        .setColor('RED')
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription("Your mail is deleted by moderator and if you have any problem with that, you can open mail again by sending message here.")
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
            const discord = require("discord.js")
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
    
    if(message.channel.parentID == category) {
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
    const Channel = member.guild.channels.cache.find(channel => channel.name === '「🏡」welcome')
    if (!Channel) return;
   let data = await canva.welcome(member, { link: "https://wallpaperaccess.com/full/87215.jpg", blur: true })
 
    const attachment = new Discord.MessageAttachment(
      data,
      "welcome-image.png"
    );


  
    Channel.send(`🎉 Selamat datang ${member} di server **${member.guild.name}** 🥂\nkamu adalah member ke ${member.guild.memberCount} disini, mohon baca peraturan di channel <#874215077740441600> ya, semoga betah~ \n\n`, attachment)

    member.send(`🎉 Selamat datang senpai ${member} di server **${member.guild.name}** 🥂 \nkamu member ke ${member.guild.memberCount}, perkenalkan dirimu dichannel dichannel <#817170275459661924> dan jangan lupa baca peraturan di <#874215077740441600> ya~ 💖`)
    member.roles.add("817216242191433738")
    
})


bot.on('message', async message => {
    if (message.content === '!join') {
        bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});






bot.on("guildMemberRemove", member => {
    const Channel = member.guild.channels.cache.find(channel => channel.name === '「☕」warung-kopi')

    Channel.send(`${member.user.tag} telah meninggalkan **${member.guild.name}** 😭, semoga kita bertemu lagi~ 😢`);
})






  
































bot.login("OTAyMTUxODcwMTYyODIxMTYx.YXaQZw.VWTZ2_k_sKlYXfLAR8HLWYmgI4U");
