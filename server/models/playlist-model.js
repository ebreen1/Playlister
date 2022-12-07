const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        ownerUsername: { type: String, required: true},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        likes: { type: Number, required: true, default: 0 },
        dislikes: { type: Number, required: true, default: 0 },
        listens: { type: Number, required: true, default: 0 },
        comments: { type: [{
            user: String,
            comment: String
        }], required: true, default: [] },
        published: {type: Boolean, required: true, default: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)