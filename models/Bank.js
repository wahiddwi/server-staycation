//import mongoose
const mongoose = require("mongoose");

//defined category schema
const bankSchema = new mongoose.Schema({
    nameBank: {
        type: String,
        required: true
    },
    nomorRekening: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

//module exports
module.exports = mongoose.model('Bank', bankSchema);