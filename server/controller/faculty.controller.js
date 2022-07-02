//Controller for Faculty


const Faculties = require('../db/schema/faculty');
const Students = require("../db/schema/student");
const Utils = require('./../services/util.services');
const bcrypt = require("bcryptjs");
const emailService = require('./../services/email.services')

class Faculty {
    async create(req, res) {
        try {
            const {name,email,password} = req.body;
            let pass = await bcrypt.hash(password, 10); // Hashing the Password
            // Check if the entered Email is present in Database
            if (await Utils.uniqueFacultyMail(email)) {
                const post = new Faculties({
                    name: name,
                    username: await Utils.generateUniqueUserName(name),
                    email: email,
                    password: pass,
                    token: await Utils.generateUniqueString()
                });

                const newFaculty = await post.save();
                let Mail = new emailService();
                Mail.mailVerification(newFaculty._id, newFaculty.email, newFaculty.name, newFaculty.verificationCode, (response) => {
                    if (response == 200) {
                        res.status(201).json(newFaculty);
                    } else {
                        res.status(500).json(newFaculty);
                    }
                });

                //When user has registered via google but wants to register again via password
            } else {
                const post = await Faculties.findOneAndUpdate({email},{
                    password: pass,
                    username: await Utils.generateUniqueUserName(name),
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
            const  Faculty = await Faculties.findById(id);
            if( Faculty){
                const result = await Faculties.updateOne({id}, {$set:data});
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
            const data= await Faculties.findById(id);
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
            const  Faculty = await Faculties.findById(id);
            let post = await  Faculty.updateOne({ verified: false })

            res.status(200).json(post);
            
        }catch(e){return res.status(500).json(e)}
    }

    async addPassword(req, res) {
        const { id } = req.params;
        let { password } = req.body;
        try {
            
            const  Faculty = await Faculties.findById(id);
            const isMatch = await bcrypt.compare(password,  Faculty.password);
            if (!isMatch) {
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt);
                let post = await  Faculty.updateOne({ $set: {password}});
                res.status(200).json(post);
            }else {
                res.status(400).json("Password Already Exist!");
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async forgotPassword(req,res) {
        // find if  Faculty of given email (req.body.email) exists
        //create a link with  Faculty's id and token and send via mail
        const {email} = req.body;
        try{
            const  Faculty = await Faculties.findOne({email});
            let Mail = new emailService();
                Mail.passwordResetMail( Faculty._id, Faculty.email, Faculty.name, Faculty.verificationCode,(response) =>{
                    if (response == 200) {
                        //  Signup Successfull & verification mail send
                        res.status(201).json( Faculty);
                    } else {
                        //  Signup Successfull & but faile to send verification mail
                        res.status(500).json( Faculty);
                        }
                });

        } catch (e) { return res.status(500).json(e) }
    }

    async updateDP(req,res) {
        const {id} = req.params;
        const {dpLink} = req.body;
        try{
            const  Faculty = await Faculties.findByIdAndUpdate(id, {dpLink}, {new: true});
            res.status(200).json( Faculty.dpLink);
        }
        catch(e){res.status(500).json(e)}
    }

    async getMentees(req,res) {
        try{
            const {id}=req.params;
            const faculty = await Faculties.findById(id).populate('mentees');
            console.log(faculty.mentees);
            res.status(200).json(faculty.mentees)
        }
        catch(error){
            res.status(404).json(error)
            console.log(error);
        }
    }

}

module.exports = Faculty;