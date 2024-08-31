import nodemailer from "nodemailer";

async function sendEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Mongoose Demo" <${process.env.APP_EMAIL}>`,
    to,
    subject,
    html,
  });

  return info.rejected.length < 1 ? true : false;
}

export default sendEmail;
