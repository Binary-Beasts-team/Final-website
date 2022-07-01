//---------------------------------------------MODULES---------------------------------------------
var express = require('express');
var userRouter = require("./student");
var facultyRouter = require("./faculty.routes");
var authRouter = require("./auth");
var googleROuter = require('./../services/strategies/google')
var Utills = require('./../services/util.services');

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
router.use('/',googleROuter);

module.exports = router;