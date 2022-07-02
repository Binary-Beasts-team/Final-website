// Controllers for Students class goes here

const Students = require('../db/schema/student');
const Outpasses = require('../db/schema/outpass');
const Utils = require('../services/util.services');
const bcrypt = require("bcryptjs");
const emailService = require('../services/email.services')

const Handler = require('../services/Log.services');

class Outpass {
    async create(req, res) {
        const {dol,dor,reason,destination} = req.body;
        const {id} = req.params;
        var date1 = new Date(dol);
        var date2 = new Date(dor);
        try {
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
                    destination: destination
                });
                const newOutpass = await post.save();
                res.status(200).json(newOutpass);
            } else {
                const post = new Outpasses({
                    studentId: id,
                    facultyId: student.facultyadvisorid,
                    DOL: dol,
                    DOR: dor,
                    days: days,
                    reason: reason,
                    destination: destination
                });
                const newOutpass = await post.save();
                res.status(200).json(newOutpass);
            }

        }catch(error){
            res.status(404).json(error)
            console.log(error);
        }
    }

    async updateStatus(req,res) {
        const {id} = req.params;
        const {fid,approved} = req.body;

        try {
            const student = await Outpasses.findById(id).populate('studentId');
            // if fid is of Facultyadvisor
            if(fid === student.facultyAdvisor){
                if(approved === true){
                    const update = await student.updateOne({$currentstatus:'Approved by faculty advisor'});
                }else{
                    const update = await student.updateOne({$currentstatus:'Request declined by faculty advisor'});
                }
                
            }
            else if(fid === student.welfareCordinator){
                if(approved === true){
                    const update = await student.updateOne({$currentstatus:'Approved by Welfare Cordinator'});
                }else{
                    const update = await student.updateOne({$currentstatus:'Request declined by Welfare Cordinator'});
                }
                
            }
            else if(fid === student.wardenMail){
                if(approved === true){
                    const update = await student.updateOne({$currentstatus:'Approved by Warden'});
                }else{
                    const update = await student.updateOne({$currentstatus:'Request declined by Warden'});
                }
            }
            else{
                if(approved === true){
                    const update = await student.updateOne({$currentstatus:'Request Sent'});
                }
            }

            // const update = await Outpass.findByIdAndUpdate(id,{approved}
        } catch (error) {
            res.status(404).json(error)
            console.log(error);
        }
    }

    async delete(req, res) {
        const {id} = req.params;
        try {
            const result = await Outpasses.findByIdAndDelete(id);
            res.status(200).json(result);
        }
        catch(error){
            res.status(500).json(error)
            console.log(error);
        }
    }
    
    async update(req,res) {
        const {id} = req.params;
        const {dol,dor,reason ,destination} = req.body;
        var date1 = new Date(dol);
        var date2 = new Date(dor);

        try {
            // const student = await Students.findById(id);
            const days = Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
            const updatedOutpass = await Outpasses.findById(id,{
                DOL: dol,
                DOR: dor,
                days: days,
                reason: reason,
                destination: destination
            });
            res.status(200).json(updatedOutpass);
        }catch(error){
            res.status(404).json(error)
            console.log(error);
        }

    }

}


module.exports = Outpass;