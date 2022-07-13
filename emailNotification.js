const nodemailer = require('nodemailer');

exports.sendEmailNotification = async (obj) => {
    console.log("Email Notification Triggered")

    try{

        let transporter = nodemailer.createTransport({
            host: "webmail.prospectatech.com",
            port: 587,
            secure: false,
            auth: {
              user: `${process.env.EMAIL_ADDRESS}`, // generated ethereal user
              pass: `${process.env.PASSWORD}`, // generated ethereal password
            },
            tls: { rejectUnauthorized: false }
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: `"VTS " <${process.env.EMAIL_ADDRESS}>`,
            to:  `${obj.email}`, 
            subject: "Reset password",
            html: "<html> <body><div> Click on the below link to reset your password</div> <diV>sdsds</div> </body></html>", 
          });

          return info;
    }catch(err){
        throw new Error(err.toString())
    }
}