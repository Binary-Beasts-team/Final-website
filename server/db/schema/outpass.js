// Schema Definition for the outpass collection goes here

const mongoose = require("mongoose");
const validator = require('validator');
const {Student} = require('./student')

const outpassSchema = new mongoose.Schema({
    studentId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
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
    reason: {                // Profile image link
        type: String,
        required: true,
        trim: true,
    },
    destination : {               // Not necessary for normal user
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