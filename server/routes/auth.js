// Routes for auth class goes here

//---------------------------------------------MODULES---------------------------------------------
const express = require('express');
const Auth = require("./../controller/auth.controller");

//---------------------------------------------INSTANCE---------------------------------------------
let authRouter = new express.Router();
let auth = new Auth();

authRouter.put('/mailoptions/mailverification/:userId/:token',async(req,res) =>{auth.emailVerification(req,res)});                               //verify email & activate User Acc.
authRouter.post('/student/login',async(req,res) =>{auth.StudentLogin(req,res)});                                                                       //
authRouter.post('/faculty/login',async(req,res) =>{auth.FacultyLogin(req,res)});                                                                       //
authRouter.put('/mailoptions/forgotpassword',async(req,res) =>{auth.forgotPassword(req,res)});                //generate password reset link
authRouter.put('/mailoptions/resetpassword/:id/:token',async(req,res) =>{auth.resetPassword(req,res)});      //verify email & reset password



module.exports = authRouter;