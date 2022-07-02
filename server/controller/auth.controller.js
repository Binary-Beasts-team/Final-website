// Controllers for auth class goes here

const Students = require('../db/schema/student');
const Faculties = require('../db/schema/faculty');
const Utils = require('../services/util.services');
const bcrypt = require("bcryptjs");
const EmailService = require('../services/email.services');

class Auth {
    async emailVerification(req,res) {
        const { userId, token } = req.params;
        try {
            const student = await Students.findOne({_id:userId});
            if (student.token === token) {
            let post = await student.updateOne({ verified: true });
            res.status(200).json(post);
            } else {
            res.status(400).json("Invalid Link !!!");
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async StudentLogin(req,res) {
        const {user,password} = req.body;
        try {
            const Student = await Students.findOne({$or : [{email: user}, {username: user}]});
            const isMatch = await bcrypt.compare(password, Student.password);
            if(isMatch && Student.verified === true) {
                res.status(200).send(Student);
            }else{
                res.status(400).json("Email Not Verified");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    async FacultyLogin(req,res) {
        const {user,password} = req.body;
        try {
            const Faculty = await Faculties.findOne({$or : [{email: user}, {username: user}]});
            const isMatch = await bcrypt.compare(password, Faculty.password);
            if(isMatch && Faculty.verified === true) {
                res.status(200).send(Faculty);
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
        // find if Student of given email (req.body.email) exists
        //create a link with Student's id and token and send via mail
        const {email} = req.body;
        console.log(email);
        try{
            const Student = await Students.findOne({email});
            if(!Student){return res.status(400).json("Student Does Not Exist !")}

            let Mail = new EmailService();
                Mail.passwordResetMail(Student._id,Student.email,Student.name,Student.verificationCode,(response) =>{
                    console.log(response);
                    if (response == 200) {
                        //Mail Sent
                        res.status(201).json(Student);
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
            const Student = await Students.findById(id);
            //if token matches
            if(Student.verificationCode === token){

                //Hash Password
                const salt = await bcrypt.genSalt(10);
                newPassword = await bcrypt.hash(newPassword, salt);
                //new token
                let newToken = await Utils.generateUniqueString();

                //Update Password & token
                let post = await Student.updateOne({$set:{
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