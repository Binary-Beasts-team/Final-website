/* GET Students listing. */

//---------------------------------------------MODULES---------------------------------------------
var express = require('express');
const Students = require("../controller/student.controller");

//---------------------------------------------MIDDLEWARE---------------------------------------------
const authenticate = require("../middlewares/authenticate");

//---------------------------------------------INSTANCE---------------------------------------------
var StudentRouter = new express.Router();
let Student = new Students();

StudentRouter.post('/',async(req,res) =>{Student.create(req,res)});  // Create a new Student
StudentRouter.put('/forgotpassword',async(req,res) =>{Student.forgotPassword(req,res)});      //forgot Pass
StudentRouter.put('/:id/update', authenticate, async(req,res) =>{Student.update(req,res)});  // Update Student
StudentRouter.get('/:id', authenticate, async(req,res) =>{Student.get(req,res)});            //get Student
StudentRouter.put('/:id/deactivate', authenticate, async(req,res) =>{Student.deactivate(req,res)});            //deactivate Student Acc.
StudentRouter.put('/:id/password', authenticate, async(req,res) =>{Student.addPassword(req,res)})
StudentRouter.put('/:id/updateDP', authenticate, async(req,res) =>{Student.updateDP(req,res)});            //upload DP
StudentRouter.put('/:id/updatefaculty', authenticate, async(req,res) =>{Student.updateFacultyAdv(req,res)});            //updateFacultyAdvisor
StudentRouter.put('/:id/updatewarden', authenticate, async(req,res) =>{Student.updateWarden(req,res)});            //updateWarden


module.exports = StudentRouter;

