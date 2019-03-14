const botconfig = require("./botconfig.json"); //contains token and prefix
const hello = require("./hello.js");
const sat = require("./sat.js");
const help = require("./help.js");
const Discord = require("discord.js"); //this is for the whole discord stuff
const Youtube = require("simple-youtube-api"); //this is to use the youtube search algorithm
const youtube = new Youtube("AIzaSyB-AeWBUDDGQ3F_GhZnuZJWU_zNUgZJlS4");
const ytdl = require("ytdl-core"); //this is to read the video from the url
//also there needs to be ffmpeg and opusscript 
const Gfycat = require("gfycat-sdk"); //this is to grab gifs
var gfycat = new Gfycat({
	clientId: "2_fHY60b",
	clientSecret: "atITNel-Xf7Nr2L_8ptI48Pj8ZOZOGgu1w6HIAcidEVx-vnY-lFynefGBJUJHGY2"
});

var playingnow = [];

var Qcount = [];
var Pcount = [];
var Gamesession = [];
var Players = []; //this is a 2d array containing -GuildID,userID,queue,score,answered?-

const bot = new Discord.Client({
	disableEveryone: true
});

bot.login(botconfig.token);

bot.on("error", function () {
	console.log("some error occured \n");
});

bot.on("ready", async function () {
	console.log(`Yawn... can you let me sleep a little bit longer?\n`);
	bot.user.setActivity("!help");
	console.log("Servers:")
	bot.guilds.forEach(function (guild) {
		console.log(" - " + guild.name);
		Gamesession[guild.id] = false;
		Pcount[guild.id] = 0;
	});
	console.log(`\n`);
});

bot.on("guildCreate", async function (guild) {
	bot.guilds.find("id", "392186594485862400").channels.find("name", "usagelogs").send(guild.name + "just added me");
	Gamesession[guild.id] = false;
	Pcount[guild.id] = 0;
});

bot.on("guildMemberAdd", async function (member) {
	let welcomeembed = new Discord.RichEmbed()
		.setTitle("Welcome " + member.user.username + "!")
		.setImage("https://cdn.discordapp.com/attachments/543464805634146344/546203553841283073/blep.PNG");

	return member.send(welcomeembed);
})

bot.on("message", async function (message) {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	function speechfunc(drop) {
		drop = drop.replace(/&#39;/g, "'");
		drop = drop.replace(/&quot;/g, "\"");
		speechembed = new Discord.RichEmbed()
			.setTitle("Karina")
			.setColor("#ffb52d")
			.setImage("https://imgplaceholder.com/428x97/e8e0b9/000000?text=" + drop.replace(/ /g, "+") + "&font-size=17")
			.setThumbnail("http://cdn.discordapp.com/attachments/502732520350154755/545881778418745384/Untitled95_20190215114938-1.png");

		return message.channel.send(speechembed);
	}

	//example : !play gachi 
	//			cmd: !play
	//			args: gachi
	var prefix = botconfig.prefix;
	var messageArray = message.content.split(" ");
	var cmd = messageArray[0];
	if (cmd[0] != "!") return;

	var args = [];
	for (i = 0; i <= 9; i++) {
		if (!messageArray[i + 1]) {
			break;
		}
		args.push(messageArray[i + 1]);
	}
	var conargs = args.join(" ");
	var rng = Math.floor(Math.random() * 100);
	var d = new Date();
	var f = new Date("2018,07,23")
	var n = d.getHours() + 7;
	var m = d.getTime() + 25200000;
	var o = f.getTime();
	var chat = "";

	sat(prefix, cmd,conargs,bot, message,messageArray);
	help(bot,Discord,message,cmd,prefix);
	if (cmd === `${prefix}hello`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) hello'd me at ${message.createdAt} ${message.guild.name}` + "```");

		var chat = "";
		chat = hello(n, message.author, chat)
		speechfunc(chat);
	}
	if (cmd === `${prefix}howgay`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) howgay'd me at ${message.createdAt} ${message.guild.name}` + "```");

		let ruser = message.mentions.users.first();
		conargs = args.join("+");
		var gayness = "";
		let gayembed = new Discord.RichEmbed()
			.setTitle("GayMeter9000")
			.setDescription("Calculating...Beep Boop");
		message.channel.send(gayembed);
		if (!ruser) {
			if (conargs) {
				gayness = "It+says+here+that+" + `${conargs}` + "+is+" + rng + "%+gay";
			} else {
				gayness = "The+gay+meter+says+that+you+are+" + rng + "%+gay";
			}
		} else {
			gayness = "It+says+here+that+" + `${ruser.username.replace(/ /g,"+")}` + "+is+" + rng + "%+gay";
		}

		function gayfunction() {
			speechfunc(gayness);
		}
		return setTimeout(gayfunction, 3000);
	}
	if (cmd === `${prefix}serverinfo`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) serverinfo'd me at ${message.createdAt} ${message.guild.name}` + "```");

		let sicon = message.guild.iconURL;
		let serverembed = new Discord.RichEmbed()
			.setDescription("Server Information")
			.setColor("#530984")
			.setThumbnail(sicon)
			.addField("Server Name", message.guild.name)
			.addField("Created On", message.guild.createdAt)
			.addField("You Joined", message.member.joinedAt)
			.addField("Total Members", message.guild.memberCount);
		return message.channel.send(serverembed);
	}
	if (cmd === `${prefix}report`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) report'd me at ${message.createdAt} ${message.guild.name}` + "```");

		message.delete();
		let ruser = message.mentions.users.first();
		if (!ruser) {
			let nouserembed = new Discord.RichEmbed()
				.setColor("#ffb52d")
				.setTitle("Karina")
				.setImage("https://imgplaceholder.com/428x97/e8e0b9/000000?text=" + "You need to mention who you want to report".replace(/ /g, "+") + "&font-size=17")
				.setThumbnail("http://cdn.discordapp.com/attachments/502732520350154755/545881778418745384/Untitled95_20190215114938-1.png");
			message.member.send(nouserembed);
		}
		let reason = conargs;;

		let reportEmbed = new Discord.RichEmbed()
			.setDescription("Reports")
			.setColor("#e20000")
			.addField("Reported User", `${ruser} with ID: ${ruser.id}`)
			.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
			.addField("Channel", message.channel)
			.addField("Time", message.createdAt)
			.addField("Reason", reason);
		var isreport = false;
		message.guild.channels.forEach(function (channer) {
			if (channer.name == "reports") {
				isreport = true;
				message.member.send(reportEmbed);
				let rsubmitembed = new Discord.RichEmbed()
					.setColor("#ffb52d")
					.setTitle("Karina")
					.setImage("https://imgplaceholder.com/428x97/e8e0b9/000000?text=" + "Your report has been submitted. May justice be served".replace(/ /g, "+") + "&font-size=17")
					.setThumbnail("http://cdn.discordapp.com/attachments/502732520350154755/545881778418745384/Untitled95_20190215114938-1.png");
				message.member.send(rsubmitembed);
				return channer.send(reportEmbed);
			}
		})
		if (!isreport) {
			var noreport = "Reports channel not found, please _br_ create a new text channel called -reports-";
			speechfunc(noreport);
		}
	}
	if (cmd === `${prefix}day`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) day'd me at ${message.createdAt} ${message.guild.name}` + "```");

		var day = Math.floor((m - o) / (1000 * 3600 * 24)) + 1;
		var itsday = "It's day " + day;
		speechfunc(itsday);
	}
	if (cmd === `${prefix}carry`) {
		if (message.member.voiceChannel) { //checks if member is in voice channel
			var fine = "Fine...";
			speechfunc(fine);

			function carryfunction() {
				message.member.voiceChannel.join();
			}
			return setTimeout(carryfunction, 3000);
		} else {
			var getinfirst = "Get in a voice channel first...";
			speechfunc(getinfirst);
		}
	}
	if (cmd === `${prefix}play`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) play'd me at ${message.createdAt} ${message.guild.name}` + "```");

		var vc = "";
		if (!message.member.voiceChannel) { //checks if member is not in a voice channel
			vc = "Get in the voice channel first..";
		} else if (!message.guild.voiceConnection) { //checks if bot is not in any of the voice channels in the guild
			vc = "I need to be in the voice channel";
		} else if (message.member.voiceChannel.name != message.guild.voiceConnection.channel.name) { //checks if bot is not in the same voice channel as the user is
			vc = "I need to be in the same voice channel as you";
		} else {
			youtube.searchVideos(conargs, 1)
				.then(function (results) {
					message.guild.voiceConnection.playStream(ytdl("\"" + `${results[0].url}` + "\"", {
						filter: 'audioonly',
						highWaterMark: 320000,
						quality: 'lowest'
					}));
					playingnow[message.guild.id] = results[0].url;
					vc = "Playing: " + `${results[0].title}`;
					speechfunc(vc);
				})
			return;
		}
		speechfunc(vc);
	}
	if (cmd === `${prefix}stop`) {
		if (message.guild.voiceConnection) {
			message.guild.voiceConnection.dispatcher.end();
			speechfunc("Stopping");
		}
	}
	if (cmd === `${prefix}leave`) {
		if (message.guild.voiceConnection) {
			return message.guild.voiceConnection.disconnect();
		} else {
			var imnotinvc = "I'm not in a voice channel though...";
			speechfunc(imnotinvc);
		}
	}
	if (cmd == `${prefix}search`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) search'd me at ${message.createdAt} ${message.guild.name}` + "```");

		youtube.searchVideos(conargs, 4)
			.then(function (results) {
				message.channel.send(`${results[0].url}`);
				message.channel.send(`${results[1].url}`);
				message.channel.send(`${results[2].url}`);
				message.channel.send(`${results[3].url}`);
			})
	}
	if (cmd === `${prefix}gif`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) gif'd me at ${message.createdAt} ${message.guild.name}` + "```");

		if (args == "") {
			var uneedtofillin = "I think you need to specify what you want to search";
			speechfunc(uneedtofillin);
			return;
		}
		let options = {
			search_text: `${conargs}`,
			count: 10,
		};
		gfycat.search(options).then(function (data) {
			do {
				var rng2 = Math.floor(Math.random() * 10);
			} while (rng2 == 0);
			var gifall = JSON.stringify(data);
			var gifound = gifall.search("gifUrl");
			if (gifound == -1) {
				var icantfind = "Sorry, I couldn't find anything with that search";
				speechfunc(icantfind);
				return;
			}
			var gifsplit = gifall.split("gifUrl\":\"");
			var gifsplitt = gifsplit[rng2].split("\",");

			let gifembed = new Discord.RichEmbed()
				.setImage(gifsplitt[0])
				.setTitle("gif")
				.setColor("#ef1cb3");
			return message.channel.send(gifembed);
		});
	}
	if (cmd == `${prefix}nhireg`) {
		if (Gamesession[message.guild.id]) {
			return speechfunc("A game is already in session");
		} else if (Pcount[message.guild.id] >= 5) {
			return speechfunc("The gameroom is full");
		}
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id && Players[i][1] == message.member.id) {
				return speechfunc("You have registered already");
			}
		}
		Players.push([message.guild.id, message.member.id, Pcount[message.guild.id], 0, false]);
		Pcount[message.guild.id]++;
		return speechfunc("Registration successful");
	}
	if (cmd == `${prefix}nhistart`) {
		bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) started an nhi game at ${message.createdAt} ${message.guild.name}` + "```");

		if (Gamesession[message.guild.id]) {
			return speechfunc("Game is already in session");
		} else if (Pcount[message.guild.id] < 2) {
			return speechfunc("You need at least 2 players");
		}
		Gamesession[message.guild.id] = true;
		Qcount[message.guild.id] = 0;
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id) {
				if (Players[i][2] == 0) {
					speechfunc("Game starting_br_It's " + message.guild.members.get(Players[i][1]).displayName + "'s turn to speak");
					Players[i][4] = true;
				}
			}
		}
	}
	if (cmd == `${prefix}nhi`) {
		if (!Gamesession[message.guild.id]) {
			return speechfunc("Game hasn't started yet");
		}
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id && Players[i][1] == message.member.id) {
				if (Players[i][2] != Qcount[message.guild.id] && !Players[i][4]) {
					if (conargs == "have") {
						Players[i][3]++;
						Players[i][4] = true;
					} else if (conargs == "never") {
						Players[i][4] = true;
					}
				}
			}
		}
	}
	if (cmd == `${prefix}nhinext`) {
		if (!Gamesession[message.guild.id]) {
			return speechfunc("Game hasn't started yet");
		}
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id) {
				if (!Players[i][4]) {
					return speechfunc("Everyone needs to answer");
				}
			}
		}
		Qcount[message.guild.id]++;
		if (Qcount[message.guild.id] >= Pcount[message.guild.id]) {
			Qcount[message.guild.id] = 0;
		}
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id) {
				if (Players[i][2] != Qcount[message.guild.id]) {
					Players[i][4] = false;
				}
			}
		}
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id && Players[i][4]) {
				return speechfunc("It's " + message.guild.members.get(Players[i][1]).displayName + "'s turn to speak");
			}
		}
	}
	if (cmd == `${prefix}nhiend`) {
		if (!Gamesession[message.guild.id]) {
			return speechfunc("The game is not in session");
		}
		let scoreembed = new Discord.RichEmbed()
		Gamesession[message.guild.id] = false;
		Pcount[message.guild.id] = 0;
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id) {
				scoreembed.addField(message.guild.members.get(Players[i][1]).displayName, "Score: " + Players[i][3]);
			}
		}
		message.channel.send(scoreembed);
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id) {
				Players.splice(i, 1);
				i--;
			}
		}
	}
	if (cmd == `${prefix}nhistatus`) {
		let scoreembed = new Discord.RichEmbed()
		for (i = 0; i < Players.length; i++) {
			if (Players[i][0] == message.guild.id) {
				scoreembed.addField(message.guild.members.get(Players[i][1]).displayName, "Answered?: " + Players[i][4] + " || Score: " + Players[i][3]);
			}
		}
		return message.channel.send(scoreembed);
	}
	if (cmd == `${prefix}test`) {
	}
});