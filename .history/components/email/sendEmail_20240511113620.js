import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const options = {
    from: process.env.SMTP_USER,
    to: 'user@gmail.com',
    subject: 'hello world',
    html: '<h1>Hello world</h1>',
  };

  await transporter.sendMail(options);

  res.status(200).json({ status: 'Email sent' });
}
