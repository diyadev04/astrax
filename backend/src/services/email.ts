import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT || '2525'),
  auth: {
    user: process.env.SMTP_USER || 'test',
    pass: process.env.SMTP_PASS || 'test'
  }
});

export const sendGrievanceEmail = async (data: any) => {
  const mailOptions = {
    from: '"ASTRAX System" <system@astrax.local>',
    to: 'diyadevsiju10@gmail.com', // Fixed destination as per user request
    subject: '🦸 Someone Needs Your Help!',
    text: `
      Someone Needs Your Help!
      
      Visitor Name: ${data.name}
      Age: ${data.age || 'Not provided'}
      Location: ${data.location || 'Not provided'}
      Email Address: ${data.email}
      
      Grievance or Request:
      ${data.grievance}
      
      Date of Submission: ${new Date().toLocaleDateString()}
      Time of Submission: ${new Date().toLocaleTimeString()}
    `,
    html: `
      <h2>🦸 Someone Needs Your Help!</h2>
      <ul>
        <li><strong>Visitor Name:</strong> ${data.name}</li>
        <li><strong>Age:</strong> ${data.age || 'Not provided'}</li>
        <li><strong>Location:</strong> ${data.location || 'Not provided'}</li>
        <li><strong>Email Address:</strong> ${data.email}</li>
      </ul>
      <h3>Grievance or Request:</h3>
      <p style="background: #f4f4f4; padding: 10px; border-left: 4px solid #00FFA3;">${data.grievance}</p>
      <p><em>Date of Submission: ${new Date().toLocaleDateString()}</em><br/>
      <em>Time of Submission: ${new Date().toLocaleTimeString()}</em></p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
