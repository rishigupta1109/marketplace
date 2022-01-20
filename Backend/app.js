const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const path = require('path')
const app = express();
app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const port = 9000;
const multer = require('multer')
let name = "";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        name = uniqueSuffix + file.originalname;
      cb(null, uniqueSuffix+file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })
// database connection
// mongoose.connect("mongodb://localhost:27017/Curasso1", {
//   useNewUrlParser: true, 
// },()=>{
//     console.log("Schema started")
// })
mongoose.connect('mongodb://localhost:27017/Forshop',{useNewUrlParser:true,useUnifiedTopology:true});
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


const Inventory = require("./models/Inventory");
app.get('/getProducts', (req, res) => {
  Inventory.find((err, data) => {
      if (err) res.send(err);
      res.send(data);
  })
})
app.post('/addProduct', upload.single('image'), (req, res) => {
  const productData = {
      productID: req.body.productID,
      productName: req.body.productName,
      stock: req.body.stock,
      productType: req.body.productType,
      category:req.body.category,
      price: req.body.price,
      discount: req.body.discount,
      image:name
  }
  const product = new Inventory(productData);
  product.save((err, data) => {
      if (err) console.log(err);
      res.send(data);
  })
})
app.listen(port, () => {
  console.log(`BE satrted at port ${port}`);
});
