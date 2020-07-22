const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    id: {type:String, required:true},
    guild: {type:String, required:true},
    xp: {type:Number, default:0},
    level: {type:Number, default:1}
});

module.exports = mongoose.model('User', productSchema);