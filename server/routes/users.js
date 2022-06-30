/* GET users listing. */

//---------------------------------------------MODULES---------------------------------------------
var express = require('express');
const Users = require("./../controller/user");

//---------------------------------------------INSTANCE---------------------------------------------
var userRouter = new express.Router();
let User = new Users();

userRouter.post('/',User.create);  // Create a new User
userRouter.get('/forgotpassword',User.forgotPassword);      
userRouter.put('/:id/update',User.update);  // Update User
userRouter.get('/:id',User.get);            //get User
userRouter.put('/:id/deactivate',User.deactivate);            //deactivate User Acc.
userRouter.put('/:id/password',User.addPassword)
userRouter.put('/:id/updateDP',User.updateDP);            //upload DP


module.exports = userRouter;

