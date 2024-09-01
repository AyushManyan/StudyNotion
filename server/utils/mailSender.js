const nodemailer = require("nodemailer");
require('dotenv').config();

const mailSender = async(email,title,body)=>{
    console.log("mailSender is runnig");
    
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            secure:false,
            
        });
        // console.log(email,title,body);
        let info = await transporter.sendMail({
            from: `"StudyNotion || CEO - Ayush Manyan" <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log("info : " , info);
        return info;
        
    } catch (error) {
        console.log(error.message);
        
    }
};

module.exports = mailSender;


