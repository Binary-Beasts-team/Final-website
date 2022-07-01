// Routes for auth class goes here

//---------------------------------------------MODULES---------------------------------------------
const express = require('express');
const Auth = require("./../controller/auth.controller");

//---------------------------------------------INSTANCE---------------------------------------------
let authRouter = new express.Router();
let auth = new Auth();

authRouter.put('/mailoptions/mailVerification/:id/:token',async(req,res) =>{auth.emailVerification(req,res)});                               //verify email & activate User Acc.
authRouter.post('/login',async(req,res) =>{auth.userLogin(req,res)});                                                                       //Get User
authRouter.put('/mailoptions/forgotpassword',async(req,res) =>{auth.forgotPassword(req,res)});                //generate password reset link
authRouter.put('/mailoptions/resetpassword/:id/:token',async(req,res) =>{auth.resetPassword(req,res)});      //verify email & reset password



module.exports = authRouter;