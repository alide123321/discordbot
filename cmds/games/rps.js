module.exports.run = async (bot, msg, args) => {
	const Discord = require('discord.js');
	const db = require('quick.db');
	var economy = new db.table('economy');
	let author = msg.author.id;
	let useracc = economy.get(`${author}.bal`);

	let bet = args[2];
	let drand = Math.floor(Math.random() * 3);

	if (!useracc) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You are not in the system try .newbal');
		return msg.channel.send(ErrorEmbed);
	}

	if (!args[2] || isNaN(bet)) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('How much do you want to bet? <0/1/2> <bet> \n0-Rock\n1-Paper\n2-scissors');
		return msg.channel.send(ErrorEmbed);
	}

	bet = Math.floor(bet);

	if (bet < 0) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You must bet 0 or more.');
		return msg.channel.send(ErrorEmbed);
	}

	if (useracc < bet) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('You do not have enough money.');
		return msg.channel.send(ErrorEmbed);
	}

	if (!args[1]) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('What do you want? <0/1/2> <bet> \n0-Rock\n1-Paper\n2-scissors');
		return msg.channel.send(ErrorEmbed);
	}

	let player = args[1];
	if (player != 0 && player != 1 && player != 2) {
		let ErrorEmbed = new Discord.MessageEmbed()
			.setTitle('**ERROR**')
			.setColor(0xff0000)
			.setThumbnail(msg.author.avatarURL())
			.setDescription('What do you want? \n0-Rock\n1-Paper\n2-scissors');
		return msg.channel.send(ErrorEmbed);
	}

	// 0 = rock
	// 1 = paper
	// 2 = sis

	if (player == 0) {
		if (drand === 0) {
			//if u get rock and dealer gets rock
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**ew**')
				.setColor(0xffa500)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You both got rock');
			msg.channel.send(SuccessEmbed);
		} else if (drand === 1) {
			//if u get rock and dealer gets paper
			var dealer = 'paper';
			economy.subtract(`${author}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**LOSS**')
				.setColor(0xff0000)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You lost: ' + bet + ' <:chip:751730576918315048> :(\nBot got: ' + dealer);
			msg.channel.send(SuccessEmbed);
		} else if (drand === 2) {
			//if u get rock and dealer gets sis
			var dealer = 'scissors';
			economy.add(`${author}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**Win**')
				.setColor(0x32cd32)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You Win: ' + bet + '<:chip:751730576918315048>\nBot got: ' + dealer);
			msg.channel.send(SuccessEmbed);
		}
		return;
	} else if (player == 1) {
		if (drand === 1) {
			//if u get paper and dealer gets paper
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**ew**')
				.setColor(0xffa500)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You both got paper');
			msg.channel.send(SuccessEmbed);
		} else if (drand === 2) {
			//if u get paper and dealer gets sis
			var dealer = 'scissors';
			economy.subtract(`${author}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**LOSS**')
				.setColor(0xff0000)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You lost: ' + bet + ' <:chip:751730576918315048> :(\nBot got: ' + dealer);
			msg.channel.send(SuccessEmbed);
		} else if (drand === 0) {
			//if u get paper and dealer gets rock
			var dealer = 'rock';
			economy.add(`${author}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**Win**')
				.setColor(0x32cd32)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You Win: ' + bet + '<:chip:751730576918315048> \nBot got: ' + dealer);
			msg.channel.send(SuccessEmbed);
		}
		return;
	} else if (player == 2) {
		if (drand === 2) {
			//if u get sis and dealer gets sis
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**ew**')
				.setColor(0xffa500)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You both got scissors');
			msg.channel.send(SuccessEmbed);
		} else if (drand === 0) {
			//if u get sis and dealer gets rock
			var dealer = 'rock';
			economy.subtract(`${author}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
        .setTitle("**LOSS**")
        .setColor(0xff0000)
        .setThumbnail(msg.author.avatarURL())
        .setDescription("You lost: " +bet +" <:chip:751730576918315048> :(\nBot got: " +dealer); // prettier-ignore
			msg.channel.send(SuccessEmbed);
		} else if (drand === 1) {
			//if u get sis and dealer gets paper
			var dealer = 'paper';
			economy.add(`${author}.bal`, bet);
			let SuccessEmbed = new Discord.MessageEmbed()
				.setTitle('**Win**')
				.setColor(0x32cd32)
				.setThumbnail(msg.author.avatarURL())
				.setDescription('You Win: ' + bet + ' <:chip:751730576918315048>\nBot got: ' + dealer);
			msg.channel.send(SuccessEmbed);
		}
		return;
	}
};

module.exports.help = {
	name: 'rps',
};
