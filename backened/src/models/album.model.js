const mongoose = require("mongoose");


const albumSchema = new mongoose.Schema({
    name : {type : String},
    artist: {type : String},
    artistId: {type : String},
    genre : {type : String},
    cover_photo : {type : String},
    year : {type : Number},
    songs : [{
        name : {type : String},
        photo : {type : String},
        duration : {type : String}
    }]
})



const Album = mongoose.model("album", albumSchema);

module.exports = Album;