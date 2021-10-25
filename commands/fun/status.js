const discord = require('discord.js');
const math = require('mathjs')
const { MessageEmbed } = require('discord.js')
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

module.exports = {
        name: 'status',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (client, message, args) => {
    let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
          return console.log(err);
      }
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new discord.MessageEmbed()
        .setTitle('Information')
        .addField("Mem Usage", `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\`\``, true)
        .addField("API Latency / BOT Latency", `\`\`\`${(client.ws.ping)}ms / ${Date.now() - message.createdTimestamp}ms\`\`\``)
        .setDescription(`
**Name**: ${client.user.username}
**ID**: ${client.user.id}
\`\`\`
Memory    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
Uptime    : ${duration}
CPU       : md\n${os.cpus().map(i => `${i.model}`)[0]}
CPU usage : ${percent.toFixed(2)}%
Arch      : ${os.arch()}
Platform  : ${os.platform()}
Users     : ${client.users.cache.size}
Servers   : ${client.guilds.cache.size}
Channels  : ${client.channels.cache.size}
Node.js   : ${process.version}
Discord.js: ${discord.version}\`\`\``)

        message.channel.send(embed)
    }
                       )
  }
}             
