const {token} = require('../configs/private.json')
const Discord = require('discord.js');
const client = new Discord.Client({ intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES,   
    Discord.Intents.FLAGS.DIRECT_MESSAGES] });

    

 client.commands = new Discord.Collection();

 ['command', 'event'].forEach(handler => {
     require(`./handler/${handler}`)(client, Discord);
 });

 ['functions'].forEach(util => {
     require(`./utils/${util}`)(client, Discord);
 });

client.on('ready', async () => {
    await require('./modules')(client, Discord)
})

client.login(token)