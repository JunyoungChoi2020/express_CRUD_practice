const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", postSchema)