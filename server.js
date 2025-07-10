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
let texts = '';

app.get('/',(req,res)=>{
  res.send("hyyyyyyy")
})

app.post('/feedback',async(req,res)=>{
   
  const{name,message} = req.body;
 const newfeedback = new feedback({name,message});
 await newfeedback.save();
  
  res.send(`thanks for your feedback ${name}`);
})

app.post('/animation',(req,res)=>{
  const{text}=req.body;

  texts = text;
  res.send("animation hai",text)
})

app.get('/qoutes',(req,res)=>{
  const search = req.query.search || '';
  console.log(search);
  const arr = [
     { "text": "Never give up" },
  { "text": "Stay positive" },
  { "text": texts }
  ]

  const arr1 = arr.filter((x) => x.text.toLowerCase().includes(search.toLowerCase()))

  res.send(search.length>0? arr1:arr)
})

app.get('/about',(req,res)=>{
  res.send({name:texts})
})

app.get('/contact',(req,res)=>{
  res.send("contact hai")
})

app.listen('5000',()=>{
   console.log("listening on port 5000");
   
})

app.get('/allfeedback', async(req,res)=>{
  const allfeedback = await feedback.find();
  res.send(allfeedback)
})