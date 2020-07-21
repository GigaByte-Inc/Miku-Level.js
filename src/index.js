if (Number(process.version.split('.')[0].match(/[0-12]+/)) < 12) throw new Error('Node 12.0.0 or higher is required. Update Node on your system.');
const {MessageEmbed, version, Client} = require("discord.js");


const Version = version.split(".")[0]

if(!Version === 12) throw new Error(`Discord.js v12 is required.`);

//if(Number(Version.match(/[0-12]+/)) < 12) throw new Error(`Discord.js v12 or higher is `)

const {EventEmitter} = require("events")

const defaultOptions = {
    randomXp: true,
    roles: [],
    owners: [],
    db: 'quick.db', // It only supports quick.db. Support for mongodb I will make later.
    channel: 'DEFAULT',
    xp: 4
};

class Level extends EventEmitter {
    /**
     * 
     * @param {Client} client 
     * @param {defaultOptions} options 
     */
    constructor(client, options) {

        super();

        if(!client) throw new Error(`(CLIENT) PARAMETER MUST BE PROVIDED`); 

        if(options.roles) {
        if(!Array.isArray(options.roles)) throw new Error('(OPTIONS) ROLES OPTION MUST BE ARRAY.');
        }

        this.client = client;
        this.channel = options.channel;

        if(options.owners)  {
            if(!Array.isArray(options.owners)) {
                throw new Error(`(OPTIONS) Owners parameter must be a array.`);
            }
        }

        this.cooldown = new Set();
        this.db = require("quick.db");

        this.client.on("message", async(message) => {

            if(message.channel.type === "dm") return;
            if(message.author.bot) return;

            let user = this.db.get(`USER_${message.author.id}`);

            if(this.cooldown.has(message.author.id)) return;

            if(!user) {
                user = {
                    xp: 0,
                    level: 1
                };
                this.db.set(`USER_${message.guild.id}_${message.author.id}`, user);
                
            }

            let givenXp = Math.round(Math.random() * 30);

            let requiredXp = Math.pow((user.level + 1) * 4, 2);

            user.xp = givenXp;

            if(user.xp > requiredXp) {
                user.level = user.level + 1;

                

                this.emit("LevelUp", {
                    textChannel: message.channel,
                    guild: message.guild,
                    user: message.author
                }, user);
            }

            await this.db.set(`USER_${message.guild.id}_${message.author.id}`);

            this.cooldown.add(message.author.id);

            setTimeout(() => {
                this.cooldown.delete(message.author.id);
            }, 60000);



        });

        this.roles = options.roles;
    };

    /**
     * 
     * @param {String} userId 
     * @param {String} guildId 
     */
    getUser(userId, guildId) {
        if(!userId || this.client.users.cache.get(userId)) throw new TypeError(`(getUser) Invalid User Id Provided.`);
        if(!guildId || this.client.guilds.cache.get(guildId)) throw new TypeError(`(getUser) Invalid Guild id provided`);

        let user = this.client.users.cache.get(userId);
        let guild = this.client.guilds.cache.get(guildId);

        let userDb = this.db.get(user.id);

        if(!userDb) return null;

        return userDb;
    }

}

module.exports = {
    levelCLient: Level,
    Utils: require("./Utils")
};