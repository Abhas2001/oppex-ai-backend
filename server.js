const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

const allowedOrigins = [
    'http://localhost:5173',
    'https://comfy-haupia-0e64e6.netlify.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));
  
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
 res.status(200).json({ message: 'OTP sent successfully', otp });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP from Oppex-AI',
    text: `Your OTP is: ${otp}`,
  };

   transporter.sendMail(mailOptions,(error,info)=>{
    console.log(error,info);
    
    if(error){
      console.log(error);
      
    }
    else{
      console.log(info.response);
      
    }
   })
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
