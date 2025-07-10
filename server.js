const express = require('express');
const app  = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGO_URL).then(()=>{
   console.log("connected to mongodb");
  }).catch((err)=>{
   console.log("error connecting to mongodb",err);    
  })

const feedback = require('./models/feedback');
app.use(cors());
app.use(express.json());

app.post('/login',async(req,res)=>{
  const {email,password}= req.body;

  console.log("email",email);
  console.log("password,",password);
  const newfeedback  = new feedback({email,password});
  await newfeedback.save();

res.send(`hi, your email is ${email}`);


})

app.get('/getlogindata',async(req,res)=>{
  const logindata = await feedback.find();

  res.send(logindata)

})

app.listen(5000,()=>{
  console.log("server is running on port 5000");
});


