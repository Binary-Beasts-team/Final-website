// Schema Definition for the user collection goes here

const mongoose = require("mongoose");
const validator = require('validator');
const {Faculty} = require('./faculty');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
    },
    regNo:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        default:""
    },
    dpLink: {                // Profile image link
        type: String,
        default: ""
    },
    googleVerification: {       // Has user signed Up via Google ?
        type: Boolean,
        default: false
    },
    verified: {       // Is user verified?
        type: Boolean,
        default: false
    },
    contactNo : {               // Not necessary for normal user
        type: String,
        default: "",
        trim: true
    },
    token:{
        type: String,
        expires: '300s'
    },
    facultyadvisorid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Faculty',
    },
    outpass:{
        type: [String],
    }
}, {timestamps: true});
const Students = mongoose.model('Student',studentSchema);
module.exports = Students;