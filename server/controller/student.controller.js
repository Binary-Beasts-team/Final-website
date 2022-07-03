// Controllers for Students class goes here

const Students = require('../db/schema/student');
const Faculty = require("../db/schema/faculty");
const Utils = require('../services/util.services');
const bcrypt = require("bcryptjs");
const emailService = require('../services/email.services')

const Handler = require('../services/Log.services');
const handler = new Handler();

class Student {
    async create(req, res) {
        try {
            const {name,email,password} = req.body;
            let pass = await bcrypt.hash(password, 10); // Hashing the Password
            // Check if the entered Email is present in Database
            if (await Utils.notUsedEmail(email)) {
                const post = new Students({
                    name: email,
                    username: await Utils.generateUniqueUserName(name),
                    email: email,
                    password: pass,
                    regNo: Utils.getstudentregno(email),
                    
                    token: await Utils.generateUniqueString()
                });
                const newStudent = await post.save();
                let Mail = new emailService();
                Mail.mailVerification(newStudent._id, newStudent.email, newStudent.name, newStudent.token, (response) => {
                    if (response == 200) {
                        res.status(201).json(newStudent);
                    } else {
                        res.status(500).json(newStudent);
                    }
                });

            } else {
                // If student already has registered via google then update
                const post = await Students.findOneAndUpdate({email},{
                    password: pass,
                    username: await Utils.generateUniqueUserName(name),
                    regNo: Utils.getstudentregno(email),
                    genderMale: genderMale,
                    verified:true
                });
                res.status(200).json(post);
            }

        }catch(error){
            res.status(404).json(error)
            console.log(error);
        }
    }

    async update(req,res) {
        const data = req.body;
        const {id} = req.params;
        try{
            const Student = await Students.findById(id);
            if(Student){
                const result = await Students.updateOne({id}, {$set:data});
                res.status(201).json(result);
            }
        }catch(error){
            console.log(error);
            res.status(404).json(error);
        }
    }

    async get(req,res){
        try{
            const {id}=req.params;
            const data= await Students.findById(id);
            res.status(201).json(data);           
            
        }
        catch(error){
            res.status(404).json(error)
            console.log(error);
        }
    }

    async deactivate(req, res) {
        const {id} = req.params;
        try {
            const Student = await Students.findById(id);
            let post = await Student.updateOne({ verified: false })
            res.status(200).json(post);
        }
        catch(error){
            res.status(500).json(error)
            console.log(error);
        }
    }

    async addPassword(req, res) {
        const { id } = req.params;
        let { password } = req.body;
        try {
            const Student = await Students.findById(id);
            const isMatch = await bcrypt.compare(password, Student.password);
            if (!isMatch) {
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);
                let post = await Student.updateOne({ $set: {password}});
                res.status(200).json(post);
            }else {
                res.status(400).json("Password Already Exist!");
            }
        }
        catch(error){
            res.status(500).json(error)
            console.log(error);
        }
    }

    async forgotPassword(req,res) {
        // find if Student of given email (req.body.email) exists
        //create a link with Student's id and token and send via mail
        const {email} = req.body;
        console.log(email);
        try{
            const Student = await Students.findOne({email});
            let Mail = new emailService();
                Mail.passwordResetMail(Student._id,Student.email,Student.name,Student.token,(response) =>{
                    if (response == 200) {
                        //  Signup Successfull & verification mail send
                        res.status(201).json(Student);
                    } else {
                        //  Signup Successfull & but faile to send verification mail
                        res.status(500).json(Student);
                        }
                });

            }
            catch(error){
                res.status(500).json(error)
                console.log(error);
            }
    }

    async updateDP(req,res) {
        const {id} = req.params;
        const {dpLink} = req.body;
        try{
            const Student = await Students.findByIdAndUpdate(id, {dpLink}, {new: true});
            res.status(200).json(Student.dpLink);
        }
        catch(error){
            res.status(500).json(error)
            console.log(error);
        }
    }
    
    async updateFacultyAdv(req,res) {
        const {facultyEmail} = req.body;
        const {id} = req.params;
        try{
            const facultyAdv = await Faculty.findOne({email: facultyEmail});
            if(!facultyAdv) {return res.status(400).json("Faculty Advisor Does Not Exist")}

            // If faculty Advisor exist:
            //add faculty Adv to student profile
            const student = await Students.findByIdAndUpdate(id,{facultyAdvisor: facultyAdv._id}, {new: true});

            //add student to faculty mentees arr
            await facultyAdv.updateOne({$push: {mentees: id}});

            res.status(200).json(student);
            
        }catch(error){
            console.log(error);
            res.status(404).json(error);
        }
    }

    async updateWarden(req,res) {
        const {wardenEmail} = req.body;
        const {id} = req.params;
        try{
            const warden = await Faculty.findOne({email: wardenEmail});
            if(!warden) {return res.status(400).json("Warden Does Not Exist")}

            // If Warden exist:
            //add Warden to student profile
            const student = await Students.findByIdAndUpdate(id,{warden: warden._id}, {new: true});

            res.status(200).json(student);
            
        }catch(error){
            console.log(error);
            res.status(404).json(error);
        }
    }
}


module.exports = Student;