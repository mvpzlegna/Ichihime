module.exports = (client) => {
  const channelId = '902223762496311357'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`Online: ${guild.members.cache.filter(m => m.presence.status !== 'offline').size}`)
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('747108016230367332')
  updateMembers(guild)
}