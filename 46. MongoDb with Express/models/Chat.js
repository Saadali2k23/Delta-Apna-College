const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sentFrom:{
        type:String,
        required:true
    },
    sentTo:{
        type:String,
        required:true
    },
    message:{
        type:String,
        minLength:1
    },
    instance:{
        type: Date
    }
})

module.exports = mongoose.model("Chat",chatSchema)