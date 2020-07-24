const { levelCLient } = require("./../");
const { Client } = require("discord.js");

const client = new Client()

const config = require("./config");
const mongoose = require("mongoose");

const password = "NOONEKNOWSISUCKATBANGLA";

mongoose.connect(`mongodb://${config.mongo_atlas.username}:${config.mongo_atlas.password}@${config.mongo_atlas.shard.one},${config.mongo_atlas.shard.two},${config.mongo_atlas.shard.three}/${config.mongo_atlas.cluster}?ssl=true&replicaSet=${config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`,{ useNewUrlParser: true, useUnifiedTopology: true }).then(mon => {
  console.log(`Connected to the database!`);
}).catch((err) => {
        console.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

client.on("ready", () => {
    console.log("Ready. Logged as "+client.user.tag+" in "+client.guilds.cache.size+" servers.");

    client.level = new levelCLient(client, {
        randomXp: true,
        mongoUrl: `mongodb://${config.mongo_atlas.username}:${config.mongo_atlas.password}@${config.mongo_atlas.shard.one},${config.mongo_atlas.shard.two},${config.mongo_atlas.shard.three}/${config.mongo_atlas.cluster}?ssl=true&replicaSet=${config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`
    })
    .on("levelUp", (data, user) => {
        console.log(user.level + " level");
    })
});

client.on("message", async(message) => {
    if(message.author.id === "437570660441784320") {
        if(message.content.startsWith("Check")) {
            console.log(await client.level.getLeaderBoard(message.guild.id));
        }
    }
});

client.login(require("./config").token);