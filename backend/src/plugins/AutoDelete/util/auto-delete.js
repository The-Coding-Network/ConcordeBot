module.exports = {
    name: 'Auto-Delete',
    description: 'automatically clear messages',
    configOptions: 'auto_delete',
    async execute(message, args) {
        if(!args[0]) return message.reply("Please enter a number of messages you want to delete!");
        if(isNaN(args[0])) return message.reply("Please enter a valid integer!");

        if(args[0] > 100) return message.reply("You cannot delete more than 100 messages!");
        if(args[0] < 1) return message.reply("You must delete at least one message!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        })
    }
}