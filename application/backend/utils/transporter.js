import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

function makeTransporter() {
  const SES = new AWS.SES({
    apiVersion: '2010-12-01',
    region: process.env.AWS_REGION
  });

  const transporter = nodemailer.createTransport({
    SES,
    sendingRate: 1
  });

  return transporter;
}



export default makeTransporter;
