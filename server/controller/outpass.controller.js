// Controllers for Students class goes here

const Students = require('../db/schema/student');
const Outpasses = require('../db/schema/outpass');
const Utils = require('../services/util.services');
const bcrypt = require("bcryptjs");
const emailService = require('../services/email.services')

const Handler = require('../services/Log.services');

class Outpass {
    async create(req, res) {
        try {
            const {dol,dor,reason,destination} = req.body;
            const {id} = req.params;

            var date1 = new Date(dol);
            var date2 = new Date(dor);

            const days = Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));  
            console.log(days);
            if (days >10) {
                const post = new Outpasses({
                    studentId: id,
                    DOL: dol,
                    DOR: dor,
                    days: days,
                    reason: reason,
                    destination: destination,
                    approvedstatus: [false, false, false, false]
                });
                const newStudent = await post.save();
                res.status(200).json(post);
            } else {
                const post = new Outpasses({
                    studentId: id,
                    DOL: dol,
                    DOR: dor,
                    days: days,
                    reason: reason,
                    destination: destination,
                    approvedstatus: [false, false, false]
                });
                const newStudent = await post.save();
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
        try{
            const Student = await Students.findOne({email});
            let Mail = new email();
                Mail.resetPassword(Student._id,Student.email,Student.name,Student.verificationCode,(response) =>{
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
    
    
}


module.exports = Outpass;