// Email sending services methods goes here...

require("dotenv").config();

//---------------------------------------------MODULES---------------------------------------------

const nodemailer = require("nodemailer");

//---------------------------------------------VARIABLES---------------------------------------------

let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "vaghanibrij222@gmail.com",
        pass: eiubirfuxnnjyerh,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

let mailOptions = {
    from: "Binary Beasts <vaghanibrij222@gmail.com>",
    to: "",
    subject: "",
};

const apiHostUrl = "http://final-website-peach.vercel.app/";

//---------------------------------------------CLASS---------------------------------------------

let verificationMail = ``;
class Email {
    // Methods
    mailVerification = async (userId, mail, name, token, callback) => {
        let subject = "Email Vericication";
        try {
            let bodyContent = `Dear User ${name} ! Please Visit this Link to Verify Your Email:  
            ${apiHostUrl}verify/mail?userId=${userId}&token=${token} <br> <br>This mail is auto generated. Do not Reply`;
            mailOptions.subject = subject;
            mailOptions.to = mail;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(mail, name);
                    callback(error);
                } else {
                    console.log("Email sent: " + info.response);
                    callback(200);
                }
            });
        } catch (error) {
            console.log(error);
            callback(400);
        }
    };

    passwordResetMail = async (userId, mail, name, token, callback) => {
        let subject = "Reset Password | Binary Beasts";
        try {
            let bodyContent = `Dear User ${name} ! Please Visit this Link to Reset your Password:  
            ${apiHostUrl}verify/resetpassword?userId=${userId}&token=${token} <br> <br>This mail is auto generated. Do not Reply`;

            mailOptions.subject = subject;
            mailOptions.to = mail;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    // return(console.callback(error));
                    console.log(mail, name);
                    callback(error);
                } else {
                    // return(callback(200));
                    console.log("Email sent: " + info.response);
                    callback(200);
                }
            });
        } catch (error) {
            console.log(error);
            callback(400);
        }
    };

    outpassSent = async (data ,facultyDetails) => {
        let subject = "Outpass Request";

        try {
            let bodyContent = `Respected Faculty Advisor <br> <br> I am ${data.studentId.name} require your permission for outpass <br><br> 
                Outpass Details:<br><br>
                Name: ${data.studentId.name} <br>
                Reg No:${data.studentId.regNo} <br>
                OutpassId: ${data._id} <br>
                Date Of Leaving: ${data.DOL} <br>
                Days : ${data.days} <br>
                Reason: ${data.reason} <br>
                Destination: ${data.destination} <br><br>
                More Information: ${apiHostUrl}user/outpass<br><br>
            This mail is auto generated. Do not Reply`;
            mailOptions.subject = subject;
            mailOptions.to = facultyDetails.email;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    outpassSentToWarden = async (data, facultyDetails) => {
        let subject = "Outpass Request";
        try {
            let bodyContent = `Respected Warden <br> <br> I am ${data.studentId.name} require your permission for outpass <br><br> 
                Outpass Details:<br><br>
                Name: ${data.studentId.name} <br>
                Reg No:${data.studentId.regNo} <br>
                OutpassId: ${data._id} <br>
                Date Of Leaving: ${data.DOL} <br>
                Days : ${data.days} <br>
                Reason: ${data.reason} <br>
                Destination: ${data.destination} <br><br>
                More Information: ${apiHostUrl}user/outpass<br><br>
            This mail is auto generated. Do not Reply`;
            mailOptions.subject = subject;
            mailOptions.to = facultyDetails.email;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    outpassSentToCoordinator = async (data,facultyDetails) => {
        let subject = "Outpass Request";
        try {
            let bodyContent = `Respected Walefare Cordinator <br> <br> I am ${data.studentId.name} require your permission for outpass <br><br> 
                Outpass Details:<br><br>
                Name: ${data.studentId.name} <br>
                Reg No:${data.studentId.regNo} <br>
                OutpassId: ${data._id} <br>
                Date Of Leaving: ${data.DOL} <br>
                Days : ${data.days} <br>
                Reason: ${data.reason} <br>
                Destination: ${data.destination} <br><br>
                More Information: ${apiHostUrl}user/outpass<br><br>
            This mail is auto generated. Do not Reply`;
            mailOptions.subject = subject;
            mailOptions.to = facultyDetails.email;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    outpassSentConfirm = async (data) => {
        let subject = "Outpass Request Details";
        let message = ""
        if(data.days > 10){
            message = "Your Outpass request is more than 10 days<br> So, it can take 2-3 days to confirm.<br>"
        }
        try {
            let bodyContent = `Your Request for Outpass is sent to your Faculty advisor <br> <br> 
                Your Details:<br><br>
                Name: ${data.studentId.name} <br>
                OutpassId: ${data._id} <br>
                Date Of Leaving: ${data.DOL} <br>
                Reason: ${data.reason} <br>
                Days : ${data.days} <br>
                Status: Outpass Last approved by Mentor and sent to walefare cordinator <br>
                Destination: ${data.destination} <br>
                Check Status Here : ${apiHostUrl}user/outpass<br><br>
                ${message}
            This mail is auto generated. Do not Reply`;

            mailOptions.subject = subject;
            mailOptions.to = data.studentId.email;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    advisorApproved = async (data) => {
        let subject = "Outpass Progress";
        try {
            let bodyContent = `Hey ${data.studentId.name}, Your request of Outpass is approved by your Mentor and is sent to Walefare cordinator <br> <br> 
                Your Details:<br><br>
                Destination: ${data.destination} <br>
                Status: ${data.currentstatus} <br>
                Check Status Here : ${apiHostUrl}user/outpass<br><br>
            This mail is auto generated. Do not Reply`;

            mailOptions.subject = subject;
            mailOptions.to = data.studentId.email;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    cordinatorApproved = async (data) => {
        let subject = "Outpass Progress";
        try {
            let bodyContent = `Hey ${data.studentId.name}, Your request of Outpass is approved by walefare cordinator and is sent to Hostel warden <br> <br> 
                Your Details:<br><br>
                Destination: ${data.destination} <br>
                Status: Outpass Last approved by walefare cordinator and sent to warden <br>
                Check Status Here : ${apiHostUrl}user/outpass<br><br>
            This mail is auto generated. Do not Reply`;

            mailOptions.subject = subject;
            mailOptions.to = data.studentId.email;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    FinalApproved = async (data) => {
        let subject = "Outpass Approved";
        try {
            let bodyContent = `Hey ${data.studentId.name} your request of Outpass for ${data.reason} is approved Successfully <br> <br> 
                Download Pfd from Here : ${apiHostUrl}user/outpass<br><br>
            This mail is auto generated. Do not Reply`;

            mailOptions.subject = subject;
            mailOptions.to = data.studentId.email;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    declinedApproved = async (data) => {
        let subject = "Outpass Declined";
        try {
            let bodyContent = `Hey ${data.studentId.name} your request of Outpass for ${data.reason} is Declined by ${data.facultyId.name} <br> <br> 
                Please contact him for further instruction<br><br>
            This mail is auto generated. Do not Reply`;

            mailOptions.subject = subject;
            mailOptions.to = data.studentId.email;
            mailOptions.html = bodyContent;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = Email;
