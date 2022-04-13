//import mongoose
const mongoose = require("mongoose");

//defined category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String
    }
});

//module exports
module.exports = mongoose.model('Category', categorySchema);