module.exports = (client) => {
  const channelId = '902223846512418826'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`Offline: ${guild.members.cache.filter(m => m.presence.status == 'offline').size.toLocaleString()}`)
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('747108016230367332')
  updateMembers(guild)
}