const Discord = require('discord.js'); // Require discord.js for your bot to communicate with the Discord API
const config = require('./config.json'); // Our config file
const client = new Discord.Client();

client.on('ready', () => { // When bot is online and ready
    console.log(`I'm ready!`);
});

client.on("message", message => { // When the bot spots a message
    
    if(message.author.bot) return; // Doesn't respond to bots

    if(message.content.indexOf(config.prefix) !== 0) return; // Only responding to existing commands that start with "!"

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // Configure arguments for the commands
    const command = args.shift().toLowerCase(); // Detect existing commands

    //Commands
    if(command === "ping") { // "!ping"
        message.channel.send('Pong!'); // Send a message saying "Pong!"
    }
    if (message.content.startsWith("!hello")) {
          message.channel.send("Hello!");
      }

      if (message.content.startsWith("!color")) {
          const color = message.content.split(" ")[1];
          const roleName = `Color-${color}`;
          let role = message.guild.roles.cache.find(r => r.name === roleName);
          if (!role) {
              role = await message.guild.roles.create({
                  data: {
                      name: roleName,
                      color: color
                  }
              });
          }
          message.member.roles.add(role);
          message.channel.send(`Color changed to ${color}`);
      } else if (message.content.startsWith("!recolor")) {
          const roleName = "Color-Rainbow";
          let role = message.guild.roles.cache.find(r => r.name === roleName);
          if (!role) {
              role = await message.guild.roles.create({ name: roleName });
          }
          message.member.roles.add(role);
          message.channel.send("Rainbow color mode activated");
          const colors = ["#ff0000", "#ffa500", "#ffff00", "#00ff00", "#0000ff", "#800080"];
          let i = 0;
          setInterval(() => {
              role.edit({ color: colors[i++ % colors.length] });
          }, 500);
      }
});

client.login(config.token); // Log in with the bot token from our config file.
