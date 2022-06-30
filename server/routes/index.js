//---------------------------------------------MODULES---------------------------------------------
const express = require('express');
const { NextFunction, response, request } =  require('express');
const userRouter = require("./users");
const authRouter = require("./auth");
const Utills = require('./../services/util.services');

Utills.ConnectDB((response) =>{
  console.log(response);
})


//---------------------------------------------INSTANCE---------------------------------------------
const router = new express.Router();

router.get('/', async (request,response) => {
        response.json({status: 'success'});
    });

router.use('/api/users',userRouter);
router.use('/api/auth',authRouter);

    
module.exports = router;