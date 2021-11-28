var mongoose =require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
var cors =require('cors');
const port = process.env.PORT || 90;

var bd = require('./config/data');


var app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));



app.listen(port,()=>{
    console.log(`Server is running on port ${port}.`)
})
