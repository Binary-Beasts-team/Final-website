// Routes for outpass class goes here

//---------------------------------------------MODULES---------------------------------------------
const express = require('express');
const outpass = require("./../controller/outpass.controller");

//---------------------------------------------INSTANCE---------------------------------------------
let OutpassRouter = new express.Router();
let Outpass = new outpass();

OutpassRouter.post('/',async(req,res) =>{Outpass.create(req,res)});
OutpassRouter.put('/:id',async(req,res) =>{Outpass.update(req,res)});
OutpassRouter.delete('/:id',async(req,res) =>{Outpass.delete(req,res)});

module.exports = OutpassRouter;