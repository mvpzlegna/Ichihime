const math = require('mathjs')
const { MessageEmbed } = require('discord.js')

module.exports = {
        name: 'calc',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('You didn\'t provide any calculations!')
        const m = await message.channel.send('Calculating...')

        var resp;
        resp = math.evaluate(args.join(' '))

        const embed = new MessageEmbed()
        .setAuthor('Math Calculation')
        .setColor('BLUE')
        .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
        .addField('Output', `\`\`\`${resp}\`\`\``)
        .setTimestamp()

        m.edit('Result!', { embed: embed })
    }
}