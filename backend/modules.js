
module.exports = async (client, Discord) => {
    //const db = await require('./db')

    client.user.setPresence({ activities: [{ name: `my default prefix '>'`, type: 'LISTENING'}], status: 'online'});
    

}