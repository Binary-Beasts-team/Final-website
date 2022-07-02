// Schema Definition for the outpass collection goes here

const mongoose = require("mongoose");
const validator = require('validator');
const {Student} = require('./student')
const {Faculty} = require('./faculty')

const outpassSchema = new mongoose.Schema({
    studentId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
    },
    facultyId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Faculty',
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
    currentstatus:{
        type: String,
        default: "Saved to draft"
    }
}, {timestamps: true});
const Outpasses = mongoose.model('Outpass',outpassSchema);
module.exports = Outpasses;