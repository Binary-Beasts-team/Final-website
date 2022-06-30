// Controllers for users class goes here

const Users = require('./../db/schema/user');
const Utils = require('./../services/util.services');
const bcrypt = require("bcryptjs");
const emailService = require('./../services/email.services')

const Handler = require('./../services/Log.services');
const handler = new Handler();

class User {
    async create(req, res) {
        try {
            const {userName,email,password} = req.body;
            // Check if the entered Email is present in Database
            if (await Utils.notUsedEmail(email)) {
                let pass = await bcrypt.hash(password, 10); // Hashing the Password
                const post = new Users({
                    name: userName,
                    email: email,
                    password: pass,
                    verificationCode: await Utils.generateUniqueString(),
                    // contact: contact
                });
                const newUser = await post.save();
                let Mail = new emailService();
                Mail.mailVerification(newUser._id, newUser.email, newUser.name, newUser.verificationCode, (response) => {
                    if (response == 200) {
                        res.status(201).json(newUser);
                    } else {
                        res.status(500).json(newUser);
                    }                
                });

            } else {
                let pass = await bcrypt.hash(password, 10); // Hashing the Password
                const post = await Users.findOneAndUpdate({email},{
                    password: pass,
                    // contact: contact
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
            const user = await Users.findById(id);
            if(user){
                const result = await Users.updateOne({id}, {$set:data});
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
            const data= await Users.findById(id);
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
            const user = await Users.findById(id);
            let post = await user.updateOne({ "activity": 0 })

            res.status(200).json(post);
            
        }catch(e){return res.status(500).json(e)}
    }

    async addPassword(req, res) {
        const { id } = req.params;
        let { password,confirmPassword } = req.body;
        try {
            if (password === confirmPassword) {
                const user = await Users.findById(id);
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    const salt = await bcrypt.genSalt(10);
                    password = await bcrypt.hash(password, salt);
                    let post = await user.updateOne({ $set: {password}});
                    res.status(200).json(post);
                }else {
                    res.status(400).json("Password Already Exist!");
                }
            }else {
                res.status(400).json("password and confirm password does not match!");
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async forgotPassword(req,res) {
        // find if user of given email (req.body.email) exists
        //create a link with user's id and token and send via mail
        const {email} = req.body;
        try{
            const user = await Users.findOne({email});
            let Mail = new email();
                Mail.resetPassword(user._id,user.email,user.name,user.verificationCode,(response) =>{
                    if (response == 200) {
                        //  Signup Successfull & verification mail send
                        res.status(201).json(user);
                    } else {
                        //  Signup Successfull & but faile to send verification mail
                        res.status(500).json(user);
                        }
                });

        } catch (e) { return res.status(500).json(e) }
    }

    async updateDP(req,res) {
        const {id} = req.params;
        const {dpLink} = req.body;
        try{
            const user = await Users.findByIdAndUpdate(id, {dpLink}, {new: true});
            res.status(200).json(user.dpLink);
        }
        catch(e){res.status(500).json(e)}
    }
    
}


module.exports = User;