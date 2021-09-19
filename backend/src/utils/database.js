const event = require('./events')

module.exports = (client, Discord, db) => {


    event.on('ban', async (message, user, time, reasonn) => {

        let expires = Date.now() + time

        try {
            db.execute(`SELECT * FROM Bans WHERE guildId = '${message.guild.id}' && userId = '${user.id}'`).then(result => {
                if (result) {
                    db.execute(`DELETE FROM Bans WHERE guildId = '${message.guild.id}' && userId = '${user.id}'`)
                }
                db.execute(`INSERT INTO Bans VALUES ('${message.guild.id}', '${user.id}', '${expires}')`).then(resultt => {
                })
            })
            message.guild.members.ban(user, {reason: reasonn}).then(() => {
                    message.channel.send({ content: `Member banned` })
                })

            setTimeout(() => {
                //message.guild.members.unban(user.id)
                event.emit('unban', message.guild.id, user.id, 'Auto unban')
            }, time)
        } catch (err) {
            message.channel.send({ content: `Error executing command please try again later` })
            console.log(err)
        }

    })

    event.on('unban', async (guildId, clientId, reason) => {
        let guild = client.guilds.cache.get(guildId)
        guild.members.unban(clientId, reason)
        db.execute(`DELETE FROM Bans WHERE guildId = '${guildId}' && userId = '${clientId}'`)
    })

    event.on('mute', async (guildId, clientId, reason) => {

    })

    event.on('unmute', async (guildId, clientId) => {

    })



}

