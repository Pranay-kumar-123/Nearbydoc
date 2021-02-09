var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Doctor = require("./backend/models/Doctor");
var Patient = require("./backend/models/patient");
var Appointment = require("./backend/models/Appointments");
mongoose.connect(
  "mongodb+srv://HAnWNJS3Mj7U5oem:pedhu@cluster0.flgd8.mongodb.net/nearbydoctor?retryWrites=true&w=majority",
  {}
);  
mongoose.connection.on("open", function () {
  console.log("MongoDB Connected ");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/dctrregister", (req, res) => {
  console.log(req.body);
  var userd = Doctor(req.body);
  userd.save();
  res.redirect("/doctor/login");
});
app.post("/api/dctrlogin", (req, res) => {
  Doctor.find(req.body, (err, userddetails) => {
    if (userddetails.length > 0) res.redirect("/dashboard");
    else res.redirect("/doctor/login");
  });
  //res.redirect("/");
});

app.post("/api/patientregister", (req, res) => {
  var userp = Patient(req.body);
  userp.save();
  res.redirect("/patient/login");
});
app.post("/api/patientlogin", (req, res) => {
  Patient.find(req.body, (err, userpdetails) => {
    if (userpdetails.length > 0) res.redirect("/dashboard");
    else res.redirect("/patient/login");
  });
});

app.use(express.static(__dirname + "/frontend"));
var port = process.env.PORT || 4000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/home.html");
});

app.get("/doctor/login", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/doctorlogin.html");
});
app.get("/search/:specialist/:location", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/search.html");
});
app.get("/doctor/register", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/doctorregister.html");
});
app.get("/patient/login", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/patientlogin.html");
});
app.get("/patient/register", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/patientregister.html");
});
app.get("/aboutus", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/aboutus.html");
});
app.get("/dashboard", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/dashboard.html");
});
app.get("/Appointments/:id", function (req, res) {
  res.sendFile(__dirname + "/frontend/html/Appointments.html");
});
app.get("/api/Appointments/:id", (req, res) => {
  Patient.findById(req.params.id, function (err, result) {
    if (err || result.length <= 0) {
      res.status(400).json({
        message: "some error occurred" + err,
      });
    } else {
      res.status(200).json({
        result: result,
      });
      //console.log(result);
    }
  });
});
app.get("/api/filter", function (req, res) {
  Doctor.find(req.query, function (err, allDBItems) {
    //console.log(err,allDBItems);
    res.send({ error: err, result: allDBItems });
  });
});
app.post("/api/createAppointment", function (req, res, next) {
  const UserId = "602115b5430a441b24507bec";
  const Appointment1 = {
    _id: new mongoose.Types.ObjectId(),
    userId: UserId,
    doctorId: req.body.doctorId,
    doctorName: req.body.doctorName,
    date: req.body.date,
    time: req.body.time,
  };
  //console.log(req.body);
  var ti = new Appointment(Appointment1);
  ti.save();
  AppointmentId = ti._id;
  DoctorName = ti.doctorName;

  //console.log(AppointmentId);
  Patient.findOneAndUpdate(
    { _id: UserId },
    {
      $push: {
        Appointments: {
          AppointmentId: AppointmentId,
          DoctorName: DoctorName,
          date: req.body.date,
          time: req.body.time,
        },
      },
    },
    (err, itemDetails) => {
      if (err) console.log("ERROR: " + err);
      console.log(itemDetails);
    }
  );
  Doctor.findOneAndUpdate(
    { _id: req.body.doctorId },
    { $push: { Appointments: { AppointmentId } } },
    (err, itemDetails) => {
      if (err) console.log("ERROR: " + err);
      console.log(itemDetails);
    }
  );
  res.status(201).json({
    message: "created",
    ti,
  });
});

app.listen(port, function () {
  console.log("Site Running on http://localhost:" + port);
});
