var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://HAnWNJS3Mj7U5oem:pedhu@cluster0.flgd8.mongodb.net/nearbydoctor?retryWrites=true&w=majority', {});
mongoose.connection.on('open', function(){
    console.log("MongoDB Connected ");
})
app.use(express.urlencoded({extended:true}));
app.use(express.json());
var userdschema=mongoose.Schema(
    {
      username:String,
      email:String,
      password:String,
      specialist:String,
      hname:String,
      hadrs:String,
      time:String,
      cfee:String
    }
  );
  var userdmodel=mongoose.model("doctor", userdschema);
  app.post("/api/dctrregister", (req,res)=>{
    var userd=userdmodel(req.body);
    userd.save();
    res.redirect("/doctor/login");
  })
  app.post("/api/dctrlogin", (req,res)=>{
    userdmodel.find(req.body,(err,userddetails)=>{
      if(userddetails.length>0)
      res.redirect("/success");
      else res.redirect("/error");
    })
    //res.redirect("/");
  })
  var userpschema=mongoose.Schema(
    {
      username:String,
      email:String,
      password:String,
      gender:String
    }
  );
  var userpmodel=mongoose.model("patient", userpschema);
  app.post("/api/patientregister", (req,res)=>{
    var userp=userpmodel(req.body);
    userp.save();
    res.redirect("/patient/login");
  })
  app.post("/api/patientlogin", (req,res)=>{
    userpmodel.find(req.body,(err,userpdetails)=>{
      if(userpdetails.length>0)
      res.redirect("/success");
      else res.redirect("/error");
    })
  })

app.use(express.static(__dirname+'/frontend'));
var port= process.env.PORT  || 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname+'/frontend/html/home.html');
  });

  app.get('/doctor/login', function(req, res){
    res.sendFile(__dirname+'/frontend/html/doctorlogin.html');
  });
  app.get('/doctor/register', function(req, res){
    res.sendFile(__dirname+'/frontend/html/doctorregister.html');
  });
  app.get('/patient/login', function(req, res){
    res.sendFile(__dirname+'/frontend/html/patientlogin.html');
  });
  app.get('/patient/register', function(req, res){
    res.sendFile(__dirname+'/frontend/html/patientregister.html');
  });
  app.get('/aboutus', function(req, res){
    res.sendFile(__dirname+'/frontend/html/aboutus.html');
  });
  app.listen(port, function(){
    console.log("Site Running on http://localhost:"+port);
});