//import mongoose
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

//defined category schema
const featureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    itemId: {
        type: ObjectId,
        ref: Item
    }
});

//module exports
module.exports = mongoose.model('Feature', featureSchema);