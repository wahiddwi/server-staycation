//import mongoose
const mongoose = require("mongoose");

//defined category schema
const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String
    }
});

//module exports
module.exports = mongoose.model('Image', imageSchema);