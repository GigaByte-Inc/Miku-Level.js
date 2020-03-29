if (Number(process.version.split('.')[0].match(/[0-12]+/)) < 12) throw new Error('Node 12.0.0 or higher is required. Update Node on your system.');
const {MessageEmbed, version} = require("discord.js");

const Version = version.split(".")[0]

if(!Version === 12) throw new Error(`Discord.js v12 is required.`);

//if(Number(Version.match(/[0-12]+/)) < 12) throw new Error(`Discord.js v12 or higher is `)

const {EventEmitter} = require("events")

const defaultOptions = {

}

class Level extends EventEmitter {
    constructor(options) {
        this.roles = options.roles ? options.roles : undefined;
    };
    run() {
        this.emit("YAY", "hi does this work?")
    }
    

}

module.exports = {
    levelCLient: Level
};