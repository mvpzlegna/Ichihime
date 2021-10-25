module.exports = (client) => {
  const channelId = '740301710219673601'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`Offline: ${guild.members.cache.filter(m => m.presence.status == 'offline').size}`)
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('721291694196391947')
  updateMembers(guild)
}