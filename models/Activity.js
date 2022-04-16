//import mongoose
const mongoose = require("mongoose");

//defined category schema
const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean
    }
});

//module exports
module.exports = mongoose.model('Activity', activitySchema);