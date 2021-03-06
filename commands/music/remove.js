module.exports = async (bot, message, args, settings) => {
	// Check that a song is being played
	const serverQueue = message.client.queue.get(message.guild.id);
	if (!serverQueue) return message.error(settings.Language, 'MUSIC/NO_QUEUE').then(m => m.delete({ timeout: 5000 }));

	// Check that user is in the same voice channel
	if (message.member.voice.channel.id !== serverQueue.voiceChannel) return message.error(settings.Language, 'MUSIC/NOT_VOICE').then(m => m.delete({ timeout: 5000 }));

	if (isNaN(args[0])) return message.channel.send('Invalid number.');

	if (!args[1]) {
		if (args[0] == 0) return message.channel.send(`Cannot remove a song that is already playing. To skip the song type: \`${settings.prefix}skip\``);
		if (args[0] > serverQueue.queue.length) return message.channel.send('Song not found.');

		const { title } = serverQueue.queue[args[0] - 1];

		serverQueue.splice(args[0] - 1, 1);
		return message.channel.send(`Removed **${title}** from the queue`);
	} else {
		if (args[0] == 0 || args[1] == 0) return message.channel.send(`Cannot remove a song that is already playing. To skip the song type: \`${settings.prefix}skip\``);
		if (args[0] > serverQueue.queue.length || args[1] > serverQueue.queue.length) return message.channel.send('Song not found.');
		if (args[0] > args[1]) return message.channel.send('Start amount must be bigger than end.');

		const songsToRemove = args[1] - args[0];
		serverQueue.queue.splice(args[0] - 1, songsToRemove + 1);
		return message.channel.send(`Removed **${songsToRemove + 1}** songs from the queue`);
	}

};

module.exports.config = {
	command: 'remove',
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK'],
};

module.exports.help = {
	name: 'Remove',
	category: 'Music',
	description: 'Removes a song from the queue',
	usage: '${PREFIX}remove <position> [position]',
};