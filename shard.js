const {ShardingManager} = require("discord.js");
require("dotenv").config()

const shards = new ShardingManager("./index.js", {
    token: process.env.TOKEN,
    totalShards: "auto"
});

shards.on("shardCreate", shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.spawn(shards.totalShards, 10000);