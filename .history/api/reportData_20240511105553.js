const nodemailer = require('nodemailer');

// ...

const createReport = async (payload) => {
  // ... code to save report to database

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gedeon.ram.dev@gmail.com',
      pass: 'Mnghl7zVztKP7pDg2ETL',
    },
  });

  const mailOptions = {
    from: 'gedeon.ram.dev@gmail.com',
    to: 'gideonramirezz@gmail.com',
    subject: 'New Report Submitted',
    text: `A new report has been submitted with the following details: ${JSON.stringify(payload)}`,
  };

  await transporter.sendMail(mailOptions);
};
