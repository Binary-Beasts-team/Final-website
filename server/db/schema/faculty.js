// Schema Definition for the user collection goes here

const mongoose = require("mongoose");
const validator = require('validator');


const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    username:{
        type: String,
        trim: true,
    },
    regNo:{
        type: String,
        default: ""
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
    mentees:{
        type: [
            {type:mongoose.Schema.Types.ObjectId,
            ref:'Student'}],
    },
    pendingoutpass:{
        type: [
            {type:mongoose.Schema.Types.ObjectId,
            ref:'Outpass'}]
    },
    approvedoutpass:{
        type: [{type:mongoose.Schema.Types.ObjectId,
            ref:'Outpass'}]
    },
    declinedoutpass:{
        type: [
            {type:mongoose.Schema.Types.ObjectId,
            ref:'Outpass'}]
    },
}, {timestamps: true});
const Faculties = mongoose.model('Faculty',facultySchema);
module.exports = Faculties;