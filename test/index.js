const { levelCLient } = require("./../src/index");
const { Client } = require("discord.js");

const client = new Client()
.level = new levelCLient(client, {
    randomXp: true
    mongoUrl
})