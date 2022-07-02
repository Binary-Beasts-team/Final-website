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
            const student = await Students.findById(id);
            const days = Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
            if (days > 10) {
                const post = new Outpasses({
                    studentId: id,
                    facultyId: student.facultyadvisorid,
                    DOL: dol,
                    DOR: dor,
                    days: days,
                    reason: reason,
                    destination: destination,
                    approvedstatus: [1, 1, 1, 1]
                });
                const newStudent = await post.save();
                res.status(200).json(post);
            } else {
                const post = new Outpasses({
                    studentId: id,
                    facultyId: student.facultyadvisorid,
                    DOL: dol,
                    DOR: dor,
                    days: days,
                    reason: reason,
                    destination: destination,
                    approvedstatus: [1, 1]
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
        const {id} = req.params;
        const {fid,approved} = req.body;

        try {
            const student = await Outpass.findById(id).populate('studentId');
            console.log(student);
            // const update = await Outpass.findByIdAndUpdate(id,{approved}
        } catch (error) {
            res.status(404).json(error)
            console.log(error);
        }
    }
    
    async delete(req, res) {
        const {id} = req.params;
        try {
            const result = await Outpass.findByIdAndDelete(id);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json(error)
            console.log(error);
        }
    }
    
}


module.exports = Outpass;