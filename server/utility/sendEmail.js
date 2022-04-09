const nodemailer = require('nodemailer')


sendEmail = (option)=>{

    const transportor = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
            
        }
    })

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:option.email,
        subject:option.subject,
        text:   option.massage
    }
    
}

module.exports = sendEmail