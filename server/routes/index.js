//---------------------------------------------MODULES---------------------------------------------
const express = require('express');
const { NextFunction, response, request } =  require('express');
const userRouter = require("./users");


//---------------------------------------------INSTANCE---------------------------------------------
const router = new express.Router();

router.get('/', async (request,response) => {
        response.json({status: 'success'});
    });
    
    router.use('/api/users',userRouter);
    
module.exports = router;