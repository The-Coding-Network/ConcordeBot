

module.exports = async (client, Discord) => {
    const db = await require('./db')

    /*
    client Discord db 
    */

    await require('./database')(client, Discord, db)

    

}