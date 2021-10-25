module.exports = (client) => {
  const channelId = '737985653056471112'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`All Members: ${guild.memberCount.toLocaleString()}`)
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('721291694196391947')
  updateMembers(guild)
}