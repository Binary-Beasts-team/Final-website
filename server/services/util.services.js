// Write the common used functions here...

const Student = require('../db/schema/student');
const Faculty = require('../db/schema/faculty');
const generateUniqueId = require('generate-unique-id');
const { v4: uuidv4 } = require("uuid");
const referralCodeGenerator = require('referral-code-generator')


const notUsedEmail = async(email) =>{
    try{
        const result = await Student.findOne({email});
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

const uniqueFacultyMail = async(email) =>{
    try{
        const result = await Faculty.findOne({email});
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

const uniqueFacultyUsername = async(username) =>{
    try {
        const result = await Faculty.findOne({username: username});
            if(result === null){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return true;
    }
}

const notUsedUserName = async(username) =>{
    try {
        const result = await Student.findOne({username: username});
            if(result === null){
                return true;
            }else{
                return false;
            }
        } catch (error) {
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

const generateUserName = async(name) =>{
    try{
        let symbols = ["@","#","$", "","*","_"];
        const symbol = symbols[Math.floor(Math.random()*symbols.length)]
        const id = await generateUniqueId({
            length: 3,
            useLetters: false
            });
            let userName = name + symbol + id
            return userName;
    }catch(error){
        console.log(error);
    }
}

const generateUniqueUserName = async(name) => {
    let notFound = true;
    let username;
    while(notFound){
        username = await generateUserName(name);
        if(await notUsedUserName(username) && await uniqueFacultyUsername(username)){
            notFound = false;
        }
    }
    return username;
}

const generateUniqueString = async() =>{
    const String = uuidv4();
    return String;
}

const getstudentregno = (email) =>{
    let string = '@iiitdwd.ac.in';
    const regno = email.replace(string,'')
    return regno;
}

module.exports = {generateUniqueUserName, notUsedUserName, uniqueFacultyUsername, notUsedEmail, uniqueFacultyMail, ConnectDB, DisconnectDB,generateUserName,generateUniqueString,getstudentregno};