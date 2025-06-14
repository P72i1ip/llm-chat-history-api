import nodeMailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'Natours <admin@natours.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // Uncomment if you want to send HTML emails
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
