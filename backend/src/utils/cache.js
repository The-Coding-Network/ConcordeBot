const {nsfw, mode, prefix} = require('../utils/maps')

module.exports = async (client, Discord) => {
    const db = await require('./db');
    await client.guilds.cache.forEach(guild => {
        //Main Information
        db.query(`SELECT * FROM Guild WHERE guildId = '${guild.id}'`, (err, result) => {
            if(err) {
                console.log(err)
                return;
            }
            if(result[0]){
                nsfw.set(guild.id, result[0].nsfw)
                mode.set(guild.id, result[0].mode)
                prefix.set(guild.id, result[0].prefix)
            } else {
                db.query(`INSERT INTO Guild VALUES ('${guild.id}', '>', 1, 0)`, (err, result) => {
                    if(err) {
                        console.log(err)
                        return;
                    }
                    nsfw.set(guild.id, 0)
                    mode.set(guild.id, 1)
                    prefix.set(guild.id, '>')
                })
            }
        })
    })
}