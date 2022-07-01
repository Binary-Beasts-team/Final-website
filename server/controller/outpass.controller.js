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
            if (days > 10) {
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