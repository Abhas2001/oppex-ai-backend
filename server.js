const express = require('express');
const app  = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("hyyyyyyy")
})

app.post('/feedback',(req,res)=>{
   
  const{name,message} = req.body;

  res.send(`thanks for your feedback ${name}`);
})

app.get('/qoutes',(req,res)=>{

  console.log(req.query.limit);
  
  res.send([
  { id: 1, text: "Believe in yourself.","limit": req.query.limit },
  { id: 2, text: "Never give up." }
])
})

app.get('/about',(req,res)=>{
  res.send({name:"about hai"})
})

app.get('/contact',(req,res)=>{
  res.send("contact hai")
})

app.listen('5000',()=>{
   console.log("listening on port 5000");
   
})