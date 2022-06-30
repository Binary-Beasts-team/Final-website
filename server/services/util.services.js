// Write the common used functions here...

const User = require('../db/schema/user');
const generateUniqueId = require('generate-unique-id');
const { v4: uuidv4 } = require("uuid");
const referralCodeGenerator = require('referral-code-generator')



const notUsedEmail = async(email) =>{
    try{
        const result = await User.findOne({email});
            if(result === null){
                return true;
            }else{
                return false;
            }
    }catch(error){
        console.log(error);
        return true;
    }
}

const ConnectDB = async(callback) =>{
        const connect = require('./connect.services');
        const db = new connect();
        db.connectDB(callback);
}

const DisconnectDB = async() =>{
    const connect = require('./connect.services');
    const db = new connect();
    db.disconnectDB();
}

const generateUniqueString = async() =>{
    const String = uuidv4();
    return String;
}

module.exports = {generateUniqueUserName, notUsedUserName, notUsedEmail, ConnectDB, DisconnectDB,generateUserName,generateUniqueString,generateUniquereffCode, findUser};