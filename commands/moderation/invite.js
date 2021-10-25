const { MessageEmbed } = require("discord.js");
module.exports = {
  name: 'invites',
  run: async (bot, message, args) => {
    const { guild } = message

    guild.fetchInvites().then((invites) => {
      const inviteCounter = {
        Rena: 13,
        Asha: 10,
      }

      invites.forEach((invite) => {
        const { uses, inviter } = invite
        const { username, discriminator } = inviter

        const name = `${username}#${discriminator}`

        inviteCounter[name] = (inviteCounter[name] || 0) + uses
      })

      let replyText = 'Invites:'

      const sortedInvites = Object.keys(inviteCounter).sort(
        (a, b) => inviteCounter[b] - inviteCounter[a]
      )

      console.log(sortedInvites)

      sortedInvites.length = 4

      for (const invite of sortedInvites) {
        const count = inviteCounter[invite]
        replyText += `\n${invite} has invited ${count} member(s)!`
      }

      message.reply(replyText)//.then(m => m.delete({timeout: 10000}))
    })
  },
}