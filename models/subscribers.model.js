const mongoose = require("mongoose")
const express = require("express")

const subscribersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subscribedToChannel: {
        type: String,
        required: true,
    },
    subscribeDate: {
        type: String,
        required: true,
        default: Date.now(),
    }
})

module.exports = mongoose.model("subscriber", subscribersSchema)
