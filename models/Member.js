//import mongoose
const mongoose = require("mongoose");

//defined category schema
const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

//module exports
module.exports = mongoose.model('Member', memberSchema);