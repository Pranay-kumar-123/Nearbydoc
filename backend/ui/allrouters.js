const express = require("express");
const app = express();

app.get("/", function (req, res) {
  console.log(__dirname);
  res.sendFile("C:\Users\vorug\Desktop\Nearbydoc/frontend/html/home.html");
  });

app.get("/verify/:userType", function (req, res) {
    res.sendFile("/Nearbydoc/frontend/html/verify.html");
    });
  
app.get("/doctor/login", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/doctorlogin.html");
  });

app.get("/search/:specialist/:location", function (req, res){
    res.sendFile("/Nearbydoc/frontend/html/search.html");
  });

app.get("/doctor/register", function (req, res) {
    res.sendFile("/Nearbydoc/frontend/html/doctorregister.html");
  });

app.get("/patient/login", function (req, res) {
    res.sendFile("/Nearbydoc/frontend/html/patientlogin.html");
  });

app.get("/patient/register", function (req, res) {
    res.sendFile("/Nearbydoc/frontend/html/patientregister.html");
  });

app.get("/aboutus", function (req, res) {
    res.sendFile("/Nearbydoc/frontend/html/aboutus.html");
  });

app.get("/dashboard", function (req, res) {
    res.sendFile("/Nearbydoc/frontend/html/dashboard.html");
  });

app.get("/appointments/:id", function (req, res) {
    res.sendFile("/Nearbydoc/frontend/html/appointments.html");
  });
  
module.exports = app