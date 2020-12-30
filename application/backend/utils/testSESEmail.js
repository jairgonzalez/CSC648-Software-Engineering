import transporter from "./transporter.js";

export default function testSESEmail() {
  const message = {
    from: 'alerts@sfsucsc648.com',
    to: 'alerts@sfsucsc648.com',
    subject: 'Testing SES Email',
    text: 'This is a simple test',
    html: '<p>This is a simple test</p>'
  }

  transporter.sendMail(message, (err, info) => {
    console.log('Err: ');
    console.log(err);
    console.log('Info: ');
    console.log(info);
  });
}

testSESEmail();

setTimeout(() => process.exit(0), 5000);
