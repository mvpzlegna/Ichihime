module.exports = (client) => {
  const channelId = '740079998316314674'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`Online: ${guild.members.cache.filter(m => m.presence.status !== 'offline').size.toLocaleString()}`)
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('721291694196391947')
  updateMembers(guild)
}