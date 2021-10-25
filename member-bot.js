module.exports = (client) => {
  const channelId = '740294318555660418'

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`Members: ${guild.members.cache.filter(m => !m.user.bot).size}`)
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('721291694196391947')
  updateMembers(guild)
}