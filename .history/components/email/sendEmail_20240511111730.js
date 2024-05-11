import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { Email } from './email';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailHtml = render(<Email url="https://example.com" />);

const options = {
  from: process.env.SMTP_USER,
  to: 'user@gmail.com',
  subject: 'hello world',
  html: emailHtml,
};

await transporter.sendMail(options);
