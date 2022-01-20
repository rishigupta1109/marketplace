const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = 9000;

// database connection
mongoose.connect("mongodb://localhost:27017/Curasso1", {
  useNewUrlParser: true, 
},()=>{
    console.log("Schema started")
})
app.use(authRoutes);

app.get('/set-cookies', (req,res)=>{
  //res.setHeader('Set-Header', 'newUser=true');
  res.cookie('newUser', false);
  res.cookie('isEmployee', true,{maxAge: 1000*60*60*24, /*secure: true, */ httpOnly: true});
  res.send('you got the cookies!');
});

app.get('/read-cookies', (req,res)=>{
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
})

app.listen(port,()=>{
  console.log(`BE satrted at port ${port}`);
})
