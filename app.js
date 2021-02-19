var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//mongoose Schemas
const Doctor = require("./backend/api/models/Doctor");
const Patient = require("./backend/api/models/patient");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//routers 
app.use(express.static(__dirname + '/frontend'));


const apiroutes = require("./backend/api/allapiroutes");
const uiroutes = require("./backend/ui/allrouters");
const dbURI = process.env.dbURI;

//database connection
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err)); 
    mongoose.Promise = global.Promise; 
console.log(Date.now())


var port = process.env.PORT || 4000;

//app.use("/ui",uiroutes);

app.get("/", function (req, res) {
  res.sendFile(__dirname+"/frontend/html/home.html");
  });

app.get("/verify", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/verify.html");
    });
  
app.get("/doctor/login", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/doctorlogin.html");
  });

app.get("/search/:specialist/:location", function (req, res){
    res.sendFile(__dirname+"/frontend/html/search.html");
  });

app.get("/doctor/register", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/doctorregister.html");
  });

app.get("/patient/login", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/patientlogin.html");
  });

app.get("/patient/register", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/patientregister.html");
  });

app.get("/aboutus", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/aboutus.html");
  });

app.get("/dashboard", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/dashboard.html");
  });

app.get("/appointments/:id", function (req, res) {
    res.sendFile(__dirname+"/frontend/html/appointments.html");
  });
  
app.use("/api", apiroutes);
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message,
      },
  });
});

<<<<<<< HEAD
//past apis
//----------------------------------------------------------------------------------------------------------------------------------------
// app.get("/api/patientregister",(req,re))
app.get("/apis/Appointments/:id", (req, res) => {
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
app.get("/apis/filter", function (req, res) {
  Doctor.find(req.query, function (err, allDBItems) {
    //console.log(err,allDBItems);
    res.send({ error: err, result: allDBItems });
  });
});
app.post("/apis/createAppointment", function (req, res, next) {
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
//past apis
//-------------------------------------------------------------------------------------------------------
=======
//manideep apis----------------------------------

//end--------------------------------------------
>>>>>>> 670c32a8e8616bfcc35df775aed87d4785811519

app.listen(port, function () {
  console.log("Site Running on http://localhost:" + port);
});
