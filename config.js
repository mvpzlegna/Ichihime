const { Guild } = require("discord.js");

module.exports = {
    //all fields are **required**
    token: 'NzIxMzU0NzE5NzQ2MDY0NDQ1.XuTT7w.xACOiPiylIr4OaK8YNbt4gWxf8A', // Your bot's token
    position:0,
    //clockchannel: '836102276124508171', // ID of a voice channel that used to display the time
    timezone: 'Asia/Seoul', // Timezone (take a look at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)
    format: 'HH:mm (z)', // Clock format, leave this default seting for 24h format, read more at https://momentjs.com/docs/#/displaying/format/
    updateinterval: 600000, // Discord is ratelimiting us for 10 minutes!
    bitrate: 73643,
    guild_id:"721291694196391947",
    userLimit:83
    //[ON WORK, IGNORE THIS FIELD] dev: 'YOUR ID', // Developer's ID for sending the errors
  }