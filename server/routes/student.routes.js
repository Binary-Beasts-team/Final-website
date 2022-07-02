/* GET Students listing. */

//---------------------------------------------MODULES---------------------------------------------
var express = require('express');
const Students = require("../controller/student.controller");

//---------------------------------------------INSTANCE---------------------------------------------
var StudentRouter = new express.Router();
let Student = new Students();

StudentRouter.post('/',async(req,res) =>{Student.create(req,res)});  // Create a new Student
StudentRouter.put('/forgotpassword',async(req,res) =>{Student.forgotPassword(req,res)});      
StudentRouter.put('/:id/update',async(req,res) =>{Student.update(req,res)});  // Update Student
StudentRouter.get('/:id',async(req,res) =>{Student.get(req,res)});            //get Student
StudentRouter.put('/:id/deactivate',async(req,res) =>{Student.deactivate(req,res)});            //deactivate Student Acc.
StudentRouter.put('/:id/password',async(req,res) =>{Student.addPassword(req,res)})
StudentRouter.put('/:id/updateDP',async(req,res) =>{Student.updateDP(req,res)});            //upload DP
StudentRouter.put('/:id/updatefaculty',async(req,res) =>{Student.updateFacultyAdv(req,res)});            //updateFacultyAdvisor
StudentRouter.put('/:id/updatewarden',async(req,res) =>{Student.updateWarden(req,res)});            //updateWarden


module.exports = StudentRouter;

