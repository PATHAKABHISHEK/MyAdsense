const nodemailer = require("nodemailer");

class EmailSenderService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.emailId,
        pass: process.env.password
      }
    });
  }
  sendEmail(mailOptions) {
    /**
     * mailOptions will be in this format
     * const mailOptions = {
       from: 'youremail@gmail.com',
       to: 'myfriend@yahoo.com',
       subject: 'Sending Email using Node.js',
       text: 'That was easy!'
       };
     */
    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

const emailSenderService = () => {
  return new EmailSenderService();
};

module.exports = {
  emailSenderService
};
