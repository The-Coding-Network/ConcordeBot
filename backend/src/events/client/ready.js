
module.exports = async (Discord, client) => {
    console.log(`Bot >> Online`)
    require('../../utils/cache')(client, Discord)
}