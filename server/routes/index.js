//---------------------------------------------MODULES---------------------------------------------
var express = require('express');
var userRouter = require("./student.routes");
var facultyRouter = require("./faculty.routes");
var authRouter = require("./auth");
var googleROuter = require('./../services/strategies/google')
var Utills = require('./../services/util.services');
var outpassRouter = require('./outpass.routes');

Utills.ConnectDB((response) =>{
  console.log(response);
}) 


//---------------------------------------------INSTANCE---------------------------------------------
var router = new express.Router();

router.get('/', async (request,response) => {
        response.json({status: 'success'});
    });

router.use('/api/student',userRouter);
router.use('/api/faculty',facultyRouter);
router.use('/api/auth',authRouter);
router.use('/api/outpass',outpassRouter);
router.use('/',googleROuter);

module.exports = router;