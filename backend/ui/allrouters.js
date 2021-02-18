const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/home.html");
});

app.get("/verify", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/verify.html");
});

app.get("/doctor/login", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/doctorlogin.html");
});

app.get("/search/:specialist/:location", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/search.html");
});

app.get("/doctor/register", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/doctorregister.html");
});

app.get("/patient/login", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/patientlogin.html");
});

app.get("/patient/register", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/patientregister.html");
});

app.get("/aboutus", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/aboutus.html");
});

app.get("/dashboard", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/dashboard.html");
});

app.get("/appointments/:id", function(req, res) {
    res.sendFile("/Nearbydoc/frontend/html/appointments.html");
});

module.exports = app