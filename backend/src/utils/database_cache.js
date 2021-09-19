const prefixes = new Map()
const mongourl = new Map()
const logschannel = new Map()
const logs = new Map()
const punishmentLogs = new Map()
const event = require('./events')

module.exports = async (Discord, client) => {
    const baseConnection = await require('./db')

    await client.guilds.cache.forEach(guild => {
        baseConnection.execute(`SELECT prefix FROM Guild WHERE guildId = ` + guild.id + ``)
        .then(result => {
            let dbresult;
            const guildId = guild.id
            

            if(!result[0][0]) {
                baseConnection.execute(`INSERT INTO Guild (guildId) VALUES (` + guild.id + `)`)
                dbresult = '>'
            } else {
                dbresult = result[0][0].prefix
            }

            
            prefixes.set(guildId, dbresult)
            event.emit('prefixFetched', guildId, dbresult);

        }).catch((err) => console.log(err))        
    })
    await client.guilds.cache.forEach(guild => {
        baseConnection.execute(`SELECT mongourl FROM Guild WHERE guildId = ` + guild.id + ``)
        .then(result => {
            let dbresult
            const guildId = guild.id
            if(result[0][0]){
                dbresult = result[0][0].mongourl
            } else {
                return;
            }
            
            mongourl.set(guildId, dbresult)
            event.emit('mongourlFetched', guildId, dbresult);

        }).catch((err) => console.log(err))        
    })
    await client.guilds.cache.forEach(guild => {
        baseConnection.execute(`SELECT logschannel FROM Guild WHERE guildId = ` + guild.id + ``)
        .then(result => {
            let dbresult
            const guildId = guild.id
            if(result[0][0]){
                dbresult = result[0][0].logschannel
            } else {
                return;
            }
            
            logschannel.set(guildId, dbresult)
            event.emit('logsChannelFetched', guildId, dbresult);

        }).catch((err) => console.log(err))        
    })
    await client.guilds.cache.forEach(guild => {
        baseConnection.execute(`SELECT logschannel FROM Guild WHERE guildId = ` + guild.id + ``)
        .then(result => {
            let dbresult
            const guildId = guild.id
            if(!result[0][0] === null){
                dbresult = result[0][0].punishmentLogs
            } else {
                return;
            }
            
            logs.set(guildId, dbresult)
            event.emit('logsFetched', guildId, dbresult);

        }).catch((err) => console.log(err))        
    })
    await client.guilds.cache.forEach(guild => {
        baseConnection.execute(`SELECT punishmentLogs FROM Guild WHERE guildId = ` + guild.id + ``)
        .then(result => {
            let dbresult
            const guildId = guild.id
            if(!result[0][0] === null){
                dbresult = result[0][0].punishmentLogs
            } else {
                return;
            }
            
            punishmentLogs.set(guildId, dbresult)
            event.emit('punishmentLogsFetched', guildId, dbresult);

        }).catch((err) => console.log(err))        
    })

}