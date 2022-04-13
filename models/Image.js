//import mongoose
const mongoose = require("mongoose");

//defined category schema
const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    }
});

//module exports
module.exports = mongoose.model('Image', imageSchema);