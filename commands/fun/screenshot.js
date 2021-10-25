const Discord = require('discord.js');
const Puppeteer = require('puppeteer');
const { MessageEmbed } = require('discord.js')
const { MessageAttachment } = require('discord.js');

module.exports = {
        name: 'ss',
        description: 'screenshot',
        aliases: [""],
        usage: '',
        accessableby: "",
  
  run: async (client, message, args, settings) => {

// make sure a website was entered
	if (!args[0]) {
		if (message.deletable) message.delete();
		return message.error(settings.Language, 'INCORRECT_FORMAT', client.commands.get('screenshot').help.usage.replace('${PREFIX}', settings.prefix)).then(m => m.delete({ timeout: 5000 }));
	}

	// send 'waiting' message
	const msg = await message.channel.send('Creating screenshot of website.');

	// try and create screenshot
	screenshot(args[0]).then(async data => {
		if (!data) {
			if (message.deletable) message.delete();
			msg.delete();
			return message.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
		} else {
			const attachment = new MessageAttachment(data, 'website.png');
			await message.channel.send(attachment);
			msg.delete();
		}
	});

	// screenshot function
	async function screenshot(url) {
		const browser = await Puppeteer.launch();
		const page = await browser.newPage();
		await page.setViewport({
			width: 1280,
			height: 720,
		});
		await page.goto(url);
		const r = await page.screenshot();
		await browser.close();
		return r;
	}
  }}