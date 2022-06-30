const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var swal = require('sweetalert')

const app = express();

//DB connection
mongoose.connect("mongodb://localhost:27017/cnlpuDB");

//Create Schema
const regSchema = new mongoose.Schema({
  name: String,
  email: String,
  regNumber: Number,
  course: String,
  contactNumber: Number,
  year: Number,
  department: String,
  whyForDept: String,
  whyForOrg: String
});

//Create model
const Reg = mongoose.model("Reg", regSchema);



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("home")
})

app.post("/register", function(req, res){
  const userReg = new Reg({
    name:           req.body.name,
    email:          req.body.email,
    regNumber:      req.body.reg,
    course:         req.body.course,
    contactNumber:  req.body.number,
    year:           req.body.year,
    department:     req.body.department,
    whyForDept:     req.body.text1,
    whyForOrg:      req.body.text2
});
userReg.save(function(err){
  if(err){
    console.log(err);
    res.redirect("/")
  } else{
    res.redirect("/");
  }
});

})


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
