// Email sending services methods goes here...

require("dotenv").config();

//---------------------------------------------MODULES---------------------------------------------

const nodemailer = require("nodemailer");




//---------------------------------------------VARIABLES---------------------------------------------

let transporter = nodemailer.createTransport({
    service:'gmail',
    // host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'vaghanibrij222@gmail.com',
        pass: process.env.VIDKARYA_ID_PASS,
    },
    tls:{
        rejectUnauthorized: false
    }
});

let mailOptions = {
    from: "Binary Beasts <vaghanibrij222@gmail.com>",
    to: "",
    subject: "",
};


const apiHostUrl = "http://localhost:3000/"

//---------------------------------------------CLASS---------------------------------------------

let verificationMail = ``; 
class Email {
    // Methods
    mailVerification = async (userId,mail,name,token,callback) => {
        let subject = "Email Vericication"
        try {
            let bodyContent = apiHostUrl +  `verify/mail/${userId}/${token}`
            mailOptions.subject = subject
            mailOptions.to = mail
            mailOptions.html = bodyContent
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(mail, name);
                    callback(error);
                } else {
                console.log('Email sent: ' + info.response);
                callback(200);
                }
            });
            
        } catch (error) {
            console.log(error);
            callback(400);
        }
    }

    passwordResetMail = async (userId,mail,name,token,callback) => {
        let subject = "Reset Password | Binary Beasts"
        try {
            let bodyContent = `Dear User ${name} ! Please Visit this Link to Reset your Password:  
            ${apiHostUrl}/resetpassword/${userId}/${token}`;
            
            mailOptions.subject = subject
            mailOptions.to = mail
            mailOptions.html = bodyContent
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  // return(console.callback(error));
                    console.log(mail, name);
                    callback(error);
                } else {
                  // return(callback(200));
                console.log('Email sent: ' + info.response);
                callback(200);
                }
            });
            
        } catch (error) {
            console.log(error);
            callback(400);
        }
    }
}



module.exports = Email;
