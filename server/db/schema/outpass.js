// Schema Definition for the outpass collection goes here

const mongoose = require("mongoose");
const validator = require('validator');

const outpassSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    DOL:{                       // Date of Leaving
        type: Date,
        required: true,
        trim: true,
    },
    DOR:{                       // Date of Returning
        type: Date,
        required: true,
        trim: true,
    },
    days: {
        type: Number,
    },
    Reason: {                // Profile image link
        type: String,
        required: true,
        trim: true,
    },
    Destination : {               // Not necessary for normal user
        type: String,
        required: true,
        trim: true
    },
    approvedstatus:{
        type: [Boolean],
    }
}, {timestamps: true});
const Outpasses = mongoose.model('Outpass',outpassSchema);
module.exports = Outpasses;