// Controllers for Students class goes here

const Students = require("../db/schema/student");
const Outpasses = require("../db/schema/outpass");
const Faculties = require("../db/schema/faculty");
const Utils = require("../services/util.services");
const bcrypt = require("bcryptjs");
const emailService = require("../services/email.services");

const Handler = require("../services/Log.services");

class Outpass {
    async create(req, res) {
        const { dol, dor, reason, destination } = req.body;
        const { id } = req.params;
        var date1 = new Date(dol);
        var date2 = new Date(dor);
        try {
            const student = await Students.findById(id);
            const days = Math.round(
                Math.abs((date1 - date2) / (1000 * 60 * 60 * 24))
            );
            const post = new Outpasses({
                studentId: id,
                facultyId: student.facultyAdvisor,
                DOL: dol,
                DOR: dor,
                days: days,
                reason: reason,
                destination: destination,
            });
            const newOutpass = await post.save();
            const updatedetails = await student.updateOne({
                $push: { outpass: newOutpass._id },
            });
            res.status(200).json(newOutpass);
        } catch (error) {
            res.status(404).json(error);
            console.log(error);
        }
    }

    async updateStatus(req, res) {
        const { id } = req.params;
        const { fid, approved } = req.body;
        try {
            const outpass = await Outpasses.findById(id)
            .populate("studentId")
            .populate("facultyId");
            // if fid is of Facultyadvisor
            if (fid == outpass.facultyId._id) {
                //If Approved by Faculty Advisor
                if (approved) {
                    const update = await outpass.updateOne({
                        //update Status
                        currentstatus: "Approved by Faculty Advisor",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        //Move to approved list
                        { _id: outpass.facultyId },
                        {
                            $push: { approvedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );

                    // //Handles Multiple approvals of same Outpass
                    // updatefaculty.approvedoutpass = Utils.removeDuplicates(
                    //     updatefaculty.approvedoutpass
                    // );

                    //If outpass for > 10 days
                    if (outpass.days > 10) {
                        //Mark this outpass as pending for Welfare Cordinator
                        const updatewelfareCordinator = await Faculties.updateOne(
                            { _id: outpass.studentId.welfareCordinator },
                            { $push: { pendingoutpass: id } }
                        );
                        res.status(201).json("Approved by Faculty Advisor");
                        console.log("Approved by Faculty Advisor");
                    }
                    
                    //Else if outpass for <= 10 days => no need for furthur approvals
                    // => Mark & Move to APPROVED in Student's Dashboard
                    else {
                        const Approved = await Students.updateOne(
                            { _id: outpass.studentId._id },
                            {
                                $push: { approvedoutpass: id },
                                $pull: { pendingoutpass: outpass.studentId._id },
                            }
                            );
                        res.status(201).json("Approved by Faculty Advisor");
                        console.log("Approved by Faculty Advisor");
                    }
                }

                // IF Declined By faculty Advisor
                else {
                    const update = await outpass.updateOne({
                        currentstatus: "Request declined by Faculty Advisor",
                    });
                    //Move to declinedOutpass list
                    const updatefaculty = await Faculties.updateOne(
                        { _id: outpass.facultyId._id },
                        {
                            $push: { declinedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    res.status(201).json("Request declined by Faculty Advisor");
                }
            }

            // if fid is of welfare Cordinator
            else if (
                fid == outpass.studentId.welfareCordinator &&
                outpass.facultyId.pendingoutpass.includes(id)
            ) {
                if (approved) {
                    const update = await outpass.updateOne({
                        currentstatus: "Approved by Welfare Cordinator",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: outpass.studentId.welfareCordinator },
                        {
                            $push: { approvedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );

                    //Handles Multiple approvals of same Outpass
                    // updatefaculty.approvedoutpass = Utils.removeDuplicates(
                    //     updatefaculty.approvedoutpass
                    // );

                    //Passed to Warden
                    const updatewarden = await Faculties.updateOne(
                        { _id: outpass.studentId.warden },
                        { $push: { pendingoutpass: id } }
                    );
                    res.status(201).json("Approved by Welfare Cordinator");
                }

                // Else if Request declined by Welfare Cordinator
                else {
                    const update = await outpass.updateOne({
                        currentstatus: "Request declined by Welfare Cordinator",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: outpass.studentId.welfareCordinator },
                        {
                            $push: { declinedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    res.status(201).json("Request declined by Welfare Cordinator");
                }
            }

            // If fid is of Warden
            else if (
                fid == outpass.studentId.warden &&
                outpass.facultyId.pendingoutpass.includes(id)
            ) {
                if (approved) {
                    const update = await outpass.updateOne({
                        currentstatus: "Approved by Warden",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: outpass.studentId.warden },
                        {
                            $push: { approvedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );

                    //Handles Multiple approvals of same Outpass
                    // updatefaculty.approvedoutpass = Utils.removeDuplicates(
                    //     updatefaculty.approvedoutpass
                    // );

                    const Userapproved = await Students.updateOne(
                        { _id: outpass.studentId._id },
                        {
                            $push: { approvedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );

                    //Handles Multiple approvals of same Outpass
                    // Userapproved.approvedoutpass = Utils.removeDuplicates(
                    //     Userapproved.approvedoutpass
                    // );

                    res.status(201).json("Approved by Warden");
                } else {
                    const update = await outpass.updateOne({
                        currentstatus: "Request declined by Warden",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: outpass.studentId.warden },
                        {
                            $push: { declinedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    res.status(201).json("Request declined by Warden");
                }
            }

            // Request Just Sent => waiting for first approval
            else {
                if (approved) {
                    const studentsent = await Students.updateOne(
                        { _id: outpass.studentId._id },
                        {
                            $push: { pendingoutpass: id },
                            $pull: { outpass: id },
                        }
                    );
                    const updatefaculty = await Faculties.updateOne(
                        { _id: outpass.studentId.facultyAdvisor },
                        { $push: { pendingoutpass: id } }
                    );
                    const update = await outpass.updateOne({
                        currentstatus: "Request Sent to Faculty Advisor",
                    });
                    res.status(201).json("Request Sent to Faculty Advisor");
                }
            }

            // const update = await Outpass.findByIdAndUpdate(id,{approved}
        } catch (error) {
            res.status(404).json(error);
            console.log(error);
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const result = await Outpasses.findByIdAndDelete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { dol, dor, reason, destination } = req.body;
        var date1 = new Date(dol);
        var date2 = new Date(dor);

        try {
            // const student = await Students.findById(id);
            const days = Math.round(
                Math.abs((date1 - date2) / (1000 * 60 * 60 * 24))
            );
            const updatedOutpass = await Outpasses.findByIdAndUpdate(id, {
                DOL: dol,
                DOR: dor,
                days: days,
                reason: reason,
                destination: destination,
            });
            res.status(200).json(updatedOutpass);
        } catch (error) {
            res.status(404).json(error);
            console.log(error);
        }
    }

    async getFacultyOutpass(req, res) {
        const { id } = req.params;
        try {
            const outpass = await Faculties.findById(id)
                .populate("pendingoutpass")
                .populate("approvedoutpass")
                .populate("declinedoutpass");
            
            let result = [outpass.pendingoutpass,outpass.approvedoutpass,outpass.declinedoutpass]
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    async getStudentOutpass(req, res) {
        const { id } = req.params;
        try {
            const outpass = await Students.findById(id)
                .populate("outpass")
                .populate("pendingoutpass")
                .populate("approvedoutpass")
                .populate("declinedoutpass");
            let result = [outpass.outpass,outpass.pendingoutpass,outpass.approvedoutpass,outpass.declinedoutpass]
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }
}

module.exports = Outpass;
