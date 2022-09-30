const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId
    },
    user:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    content:{
        type: String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Comment", commentSchema)
