//import mongoose
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

//defined category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    itemId: [{
        type: ObjectId,
        ref: 'Item'
    }],
});

//module exports
module.exports = mongoose.model('Category', categorySchema);