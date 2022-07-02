// Routes for outpass class goes here

//---------------------------------------------MODULES---------------------------------------------
const express = require('express');
const outpass = require("./../controller/outpass.controller");

//---------------------------------------------INSTANCE---------------------------------------------
let OutpassRouter = new express.Router();
let Outpass = new outpass();

OutpassRouter.post('/:id',async(req,res) =>{Outpass.create(req,res)});
OutpassRouter.put('/:id',async(req,res) =>{Outpass.updateStatus(req,res)});
OutpassRouter.put('/:id/update',async(req,res) =>{Outpass.update(req,res)});
OutpassRouter.delete('/:id',async(req,res) =>{Outpass.delete(req,res)});
OutpassRouter.put('/:id/student',async(req,res) =>{Outpass.getStudentOutpass(req,res)});
OutpassRouter.put('/:id/faculty',async(req,res) =>{Outpass.getFacultyOutpass(req,res)});

module.exports = OutpassRouter;