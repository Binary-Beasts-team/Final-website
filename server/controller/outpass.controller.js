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
            )
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
            const student = await Outpasses.findById(id)
                .populate("studentId")
                .populate("facultyId");
            // if fid is of Facultyadvisor
            if (fid == student.facultyId._id && student.studentId.pendingoutpass.includes(id)) {
                if (approved) {
                    const update = await student.updateOne({
                        currentstatus: "Approved by faculty advisor",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: student.facultyId },
                        {
                            $push: { approvedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    if (student.days > 10) {
                        const updatewelfareCordinator = await Faculties.updateOne(
                            { _id: student.studentId.welfareCordinator },
                            { $push: { pendingoutpass: id } }
                        );
                        console.log("Approved by faculty advisor");
                    } else {
                        const Approved = await Students.updateOne(
                            { _id: student.studentId._id },
                            {
                                $push: { approvedoutpass: id },
                                $pull: { pendingoutpass: student.studentId._id },
                            }
                            );
                        console.log("Approved by faculty advisor");
                    }
                } else {
                    const update = await student.updateOne({
                        currentstatus: "Request declined by faculty advisor",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: student.facultyId._id },
                        {
                            $push: { declinedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    res.json("Request declined by faculty advisor")
                }
            } else if (
                fid == student.studentId.welfareCordinator &&
                student.facultyId.pendingoutpass.includes(id)
            ) {
                if (approved) {
                    const update = await student.updateOne({
                        currentstatus: "Approved by Welfare Cordinator",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: student.studentId.welfareCordinator },
                        {
                            $push: { approvedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    const updatewarden = await Faculties.updateOne(
                        { _id: student.studentId.warden },
                        { $push: { pendingoutpass: id } }
                    );
                    res.json("Approved by Welfare Cordinator")

                } else {
                    const update = await student.updateOne({
                        currentstatus: "Request declined by Welfare Cordinator",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: student.studentId.welfareCordinator },
                        {
                            $push: { declinedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    res.json("Request declined by Welfare Cordinator")
                }
            } else if (
                fid == student.studentId.warden &&
                student.facultyId.pendingoutpass.includes(id)
            ) {
                if (approved) {
                    const update = await student.updateOne({
                        currentstatus: "Approved by Warden",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: student.studentId.warden },
                        {
                            $push: { approvedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    const Userapproved = await Students.updateOne(
                        { _id: student.studentId._id },
                        {
                            $push: { approvedoutpass: id },
                            $pull: { pendingoutpass: id }
                        }
                    );
                    res.json("Approved by Warden")

                } else {
                    const update = await student.updateOne({
                        currentstatus: "Request declined by Warden",
                    });
                    const updatefaculty = await Faculties.updateOne(
                        { _id: student.studentId.warden },
                        {
                            $push: { declinedoutpass: id },
                            $pull: { pendingoutpass: id },
                        }
                    );
                    res.json("Request declined by Warden")

                }
            } else {
                if (approved) {
                    const studentsent = await Students.updateOne(
                        { _id: student.studentId._id },
                        {
                            $push: { pendingoutpass: id },
                            $pull: { outpass: id },
                        }
                    );
                    const updatefaculty = await Faculties.updateOne(
                        { _id: student.studentId.facultyAdvisor },
                        { $push: { pendingoutpass: id } }
                    );
                    const update = await student.updateOne({
                        currentstatus: "Request Sent",
                    });
                    res.json("Request Sent")

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
            const updatedOutpass = await Outpasses.findById(id, {
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
}

module.exports = Outpass;
