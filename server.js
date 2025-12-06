const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.post('/api/contact', async (req,res)=>{
  const {name,email,message} = req.body;
  if(!name || !email || !message) return res.json({message:'All fields required'});
  try{
    const transporter = nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT):587,
      secure:false,
      auth:{user:process.env.SMTP_USER, pass:process.env.SMTP_PASS}
    });
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `New message from Md Sadikur Rahman Shadhin`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
    res.json({message:'Message sent successfully!'});
  }catch(err){
    console.error(err);
    res.json({message:'Email error'});
  }
});

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','index.html'));
});

app.listen(3000, ()=> console.log('Server running on http://localhost:3000'));
