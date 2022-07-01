/* GET Faculty listing. */

//---------------------------------------------MODULES---------------------------------------------
var express = require('express');
const FacultyControl = require("../controller/faculty.controller");

//---------------------------------------------INSTANCE---------------------------------------------
var FacultyRouter = new express.Router();
let Faculty = new FacultyControl();

FacultyRouter.post('/',async(req,res) =>{Faculty.create(req,res)});                         // Create a new Faculty
FacultyRouter.get('/forgotpassword',async(req,res) =>{Faculty.forgotPassword(req,res)});    //Generate Password reset Link
FacultyRouter.put('/:id/update',async(req,res) =>{Faculty.update(req,res)});                // Update Faculty
FacultyRouter.get('/:id',async(req,res) =>{Faculty.get(req,res)});                          //Get Faculty
FacultyRouter.put('/:id/deactivate',async(req,res) =>{Faculty.deactivate(req,res)});        //Deactivate Faculty Acc.
FacultyRouter.put('/:id/password',async(req,res) =>{Faculty.addPassword(req,res)})          // Adds password
FacultyRouter.put('/:id/updatedp',async(req,res) =>{Faculty.updateDP(req,res)});            //Updates DP


module.exports = FacultyRouter;

