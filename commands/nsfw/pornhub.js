const Discord = require('discord.js');
const superagent = require("superagent");
const Pornsearch = require('pornsearch');
const errors = require('../../errors');


module.exports = {
        name: 'bokep',
        description: 'Shows Anal Pictures',
        aliases: [""],
        usage: '',
        accessableby: "",
    run: async (client, message, args) => {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        var s = message.content.split(/\s+/g).slice(1).join(" ");

        if (!s) {
            return message.channel.send('Please provide me something to search for!')
        }

        var Searcher = new Pornsearch(s);

        try {
            Searcher.videos()
                .then(videos => message.channel.send(videos[1].url));

            return null;

        } catch (err) {
            return message.channel.send(`No results found for **${s}**`)
        }
    }
}










