// Controllers for auth class goes here

const Users = require('./../db/schema/user');
const Utils = require('../services/util.services');
const bcrypt = require("bcryptjs");
const EmailService = require('./../services/email.services');

class Auth {
    async emailVerification(req,res) {
        const {id, token} = req.params;
        try{
            const user = await Users.findById(id);
            if(user.verificationCode === token){
                let post = await user.updateOne({"activity": 1});
                res.status(200).json(post);
            }
            else{
                res.status(400).json("Invalid Link !!!");
            }
        }catch(e){return res.status(500).json(e)}
        
    }

    async userLogin(req,res) {
        const {email,password} = req.body;
        try {
            const user = await Users.findOne({email});
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch && user.verified === true) {
                res.status(200).send(user);
            }else{
                res.status(400).json("Email Not Verified");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    //Generate password Reset link and Send via Mail
    async forgotPassword(req,res) {
        // find if user of given email (req.body.email) exists
        //create a link with user's id and token and send via mail
        const {email} = req.body;
        console.log(email);
        try{
            const user = await Users.findOne({email});
            if(!user){return res.status(400).json("User Does Not Exist !")}

            let Mail = new EmailService();
                Mail.passwordResetMail(user._id,user.email,user.name,user.verificationCode,(response) =>{
                    console.log(response);
                    if (response == 200) {
                        //Mail Sent
                        res.status(201).json(user);
                    }
                    else {
                        //  Signup Successful & but failed to send verification mail
                        res.status(500).json("Mail Not Sent");
                        }
                });

        } catch (e) { return res.status(500).json(e) }
    }

    // verify Link and Change  Password
    async resetPassword(req,res) {
        const {password, ConfirmPassword} = req.body
        const {id, token} = req.params
        if(password !== ConfirmPassword){
            return res.status(400).json("Both Password must be same !");
        }
        let newPassword = password;
        try{
            const user = await Users.findById(id);
            //if token matches
            if(user.verificationCode === token){

                //Hash Password
                const salt = await bcrypt.genSalt(10);
                newPassword = await bcrypt.hash(newPassword, salt);
                //new token
                let newToken = await Utils.generateUniqueString();

                //Update Password & token
                let post = await user.updateOne({$set:{
                    verificationCode: newToken,
                    password: newPassword
                }});
                res.status(200).json(post);
            }
            else{
                res.status(400).json("Invalid Link !!!");
            }
        }catch(e){return res.status(500).json(e)}

}
}

module.exports = Auth;