const config = require('../../../../configs/private.json')
const moment = require('moment')
const maps = require('../../utils/maps')
const event = require('../../utils/events')

module.exports = async (Discord, client, message) => {

    let prefix;
   
    if(message.guild === null || !message.guild) return;
    if (message.author.bot) return;
    prefix = maps.prefix.get(message.guild.id)
    
    if(!prefix) {
        prefix = '>'
    }
    
    if(message.content === 'whatismyprefix'){
        message.channel.send({content: prefix})
    }
    if (!message.content.startsWith(prefix)) return;
    

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }
    
    


    const current_time = Date.now()
    const time_stamps = cooldowns.get(command.name)
    const cooldown_amount = (command.cooldown) * 1000 || 3000

    if (time_stamps.has(`${message.author.id}-${message.guild.id}`)) {
        const expiration_time = time_stamps.get(`${message.author.id}-${message.guild.id}`) + cooldown_amount;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;

            return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${prefix}${command.name}`);
        }
    }

    time_stamps.set(`${message.author.id}-${message.guild.id}`, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    try {
        command.execute(Discord, client, message, args);
    } catch (err) {
        message.reply("Cant execute command please try again later");
        console.log(err);
    }
}