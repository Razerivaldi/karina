module.exports = function(bot,Discord,message,cmd,prefix) {
	if (cmd == `${prefix}help`) {
    bot.guilds.get("392186594485862400").channels.get("550756202083123217").send("```" + `${message.author.username} (${message.author.id}) help'd me at ${message.createdAt} ${message.guild.name}` + "```");

		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
			.setTitle("Karina")
			.setDescription("Currently available commands: ")
			.setColor("#ffb52d")
			.setThumbnail(bicon)
			.addBlankField()
			.addField("!hello", "well... hello...")
			.addField("!howgay", "everyone is gay don't bother making me measure how much... yawn")
			.addField("!serverinfo", "I suggest you look this server's members list and ask help from them instead *sigh*")
			.addField("!report", "you can tell me what happened... @mention who you're going to report then the reason why")
			.addField("!carry", "yawn I'm still taking a nap... but fine, I'll join you in the voice channel")
			.addField("!play", "taking breaks is part of work, let's play some songs and take a nap")
			.addField("!stop", "sup")
			.addField("!leave", "sup")
			.addField("!search", "sup")
			.addField("!gif", "sup")
			.addField("!nhihelp", "You can also play a game of **Never have I ever** with your friends I guess..")
			

		return message.channel.send(botembed);
	}
	if (cmd == `${prefix}nhihelp`){
		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
			.setTitle("Never Have I Ever Instructions")
			.setDescription("Never Have I Ever is a social game in which players take turns saying ***Never have I [something you've never done before]*** (Only say something you have NEVER done) The other players would then have to reply with a statement on whether they have experienced the same or not. (In this case, either *!nhi have* or *!nhi never*). The scores will be tallied once the game ends, but you can check your scores anytime with !nhistatus. The player with the highest score loses.")
			.setColor("#ffb52d")
			.setThumbnail(bicon)
			.addField("Starting a game","**1** Register yourself with **!nhireg**, you need at least 2 players registered in order to start the game.\n**2** Start a game session with **!nhistart**, there can only be one game session per guild.")
			.addField("Ingame commands","**!nhi have/never** Answer this if you have or have not done or experienced it.\n**!nhistatus** Type this command to check the scores and whether a player has not given their answers in the round.\n**!nhinext** Use this command to advance to the next round.")
			.addField("Ending the game", "Simply type in !nhiend to end the game.");
			return message.channel.send(botembed);
	}
}