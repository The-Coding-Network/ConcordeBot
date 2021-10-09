const Discord = require('discord.js')
const client = new Discord.Client({ intents: [] })
const colors = require('colors')
const {token} = require('../configs/private.json')

/*
Webhook url
https://discord.com/api/webhooks/884111710590496818/dYXlKVgvKU5glcRfPrvfZRUAcMr0-gk_HYGmLXPrekml-jqlQAHJVb4srVWC4beQUopW
*/

const webhook = new Discord.WebhookClient({
    id: '884111710590496818',
    token: 'dYXlKVgvKU5glcRfPrvfZRUAcMr0-gk_HYGmLXPrekml-jqlQAHJVb4srVWC4beQUopW'
})

const shards = new Discord.ShardingManager('./index.js', {
    token: token,
    respawn: true,
    totalShards: 'auto'
});

const embed = new Discord.MessageEmbed()

shards.on('shardCreate', shard => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Online - Shard ID \`${shard.id}\``)
        .setDescription(`Shard count \`${shard.env.SHARD_COUNT}\``)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(`The shards are not perfect there might be problems`)

    webhook.send({ embeds: [embed] })
    console.log(`${shard.id} has been started, total shards are ${shard.env.SHARD_COUNT}`)
});

shards.spawn()