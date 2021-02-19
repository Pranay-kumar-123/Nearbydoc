const express = require("express");
const router = express.Router();

const doctorRoutes = require("./doctor");
<<<<<<< HEAD

const patient = require("./patient");
=======
const patientRoutes = require("./patient");
const otherRoutes = require("./other");
>>>>>>> 670c32a8e8616bfcc35df775aed87d4785811519

// const adminRoutes = require("./admin");
// const quizRoutes = require("./quiz");
// const questionRoutes = require("./questions");
// const authRoutes = require("./auth");
// const authAdminRoutes = require("./auth-admin");
// const generalRoutes = require("./general");
// const ownerRoutes = require("./owner");
// const feedbackRoutes = require("./feedback");
// const suggestRoutes = require("./suggestion");


//IMPORT QUIZ AND USERS

// const Quiz = require('./quiz');
// const User = require('./doctor');
// const Admin = require('./admin');


router.use("/doctor", doctorRoutes);
<<<<<<< HEAD
router.use("/patient",patient)
=======
router.use("/patient", patientRoutes);
router.use("/other", otherRoutes);

>>>>>>> 670c32a8e8616bfcc35df775aed87d4785811519
// router.use("/admin", adminRoutes);
// router.use("/quiz", quizRoutes);
// router.use("/question", questionRoutes);
// router.use("/auth", authRoutes);
// router.use("/general", generalRoutes);
// router.use("/owner", ownerRoutes);
// router.use("/auth/admin", authAdminRoutes);
// router.use("/feedback", feedbackRoutes);
// router.use("/suggest", suggestRoutes);


module.exports = router;