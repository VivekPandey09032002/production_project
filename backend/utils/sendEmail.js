const nodemailer = require("nodemailer")

const sendEmail = async (options) => {
    let transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure : false,
        auth : {
            user : process.env.SMTP_USER,
            pass : process.env.SMTP_PASS
        }

    })

    const mailOptions = {
        from : process.env.SMPT_USER,
        to : options.email,
        subject : options.subject,
        text : options.message,
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail