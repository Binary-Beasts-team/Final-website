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
        pass: process.env.VIDKARYA_ID_PASS,
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

const apiHostUrl = "http://localhost:3000/";

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

    outpassSent = async (data) => {
        let subject = "Outpass Request";

        try {
            let bodyContent = `Respect Faculty Advisor <br> <br> I am ${data.studentId.name} require your permission for outpass <br><br> 
                Outpass Details:<br><br>
                Name: ${data.studentId.name} <br>
                Reg No:${data.studentId.regno} <br>
                OutpassId: ${data._id} <br>
                Date Of Leaving: ${data.DOL} <br>
                Date Of Return: ${data.DOR} <br>
                Reason: ${data.reason} <br>
                Destination: ${data.destination} <br><br>
                More Information: ${apiHostUrl}user/outpass<br><br>
            This mail is auto generated. Do not Reply`;
            mailOptions.subject = subject;
            mailOptions.to = data.facultyId.email;
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
        try {
            let bodyContent = `Your Request for Outpass is sent to your Faculty advisor <br> <br> 
                Your Details:<br><br>
                Name: ${data.studentId.name} <br>
                OutpassId: ${data._id} <br>
                Date Of Leaving: ${data.DOL} <br>
                Date Of Return: ${data.DOR} <br>
                Reason: ${data.reason} <br>
                Destination: ${data.destination} <br><br>
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
}

module.exports = Email;
