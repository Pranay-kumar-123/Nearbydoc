const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const shortid = require("shortid");

const router = express.Router();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const patient = require("./models/patient");
//const shortid = require("shortid");

const router = express.Router();
router.post("/register", (req, res) => {
    var userp = patient(req.body);
    userp.save();
    res.redirect("/dashboard");
  });
router.post("/login", (req, res) => {
    patient.find(req.body, (err, userpadetails) => {
      if (userpadetails.length > 0) res.redirect("/dashboard");
      else res.redirect("/patient/login");
    }); 
  });

module.exports = router;
// router.post("/signup", async(req, res, next) => {

//     item.getItemByQuery({ email: req.body.email }, User, (err, user) => {
//         if (err) {
//             res.status(500).json({
//                 error: err,
//             });
//         } else {
//             if (user.length >= 1) {
//                 res.status(409).json({
//                     message: "Email already exists",
//                 });
//             } else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(500).json({
//                             error: err,
//                         });
//                     } else {
//                         const user = {
//                             _id: new mongoose.Types.ObjectId(),
//                             email: req.body.email,
//                             password: hash,
//                             username: req.body.username,
//                             gender: req.body.gender,
//                         };
//                         item.createitem(user, User, async(err, result) => {
//                             if (err) {
//                                 res.status(500).json({
//                                     error: err,
//                                 });
//                             } else {
                              
//                                         res.status(201).json({
//                                             message: "user created",
//                                             userDetails: {
//                                                 userId: result._id,
//                                                 email: result.email,
//                                                 username: result.username,
//                                                 gender: result.gender,
//                                             },
                                            
//                                         });
                                   
//                             }
//                         })
//                     }

//                 })
//             }
//         }
//     })

// });
// router.post("/login", async(req, res, next) => {
//     // if (!req.body.captcha) {
//     //     return res.status(400).json({
//     //         message: "No recaptcha token",
//     //     });
//     // }
//     // var flag = 0;
//     // request(req.verifyURL, (err, response, body) => {
//     //     body = JSON.parse(body);
//     //     console.log(err)
//     //     console.log(body)
//     //     try {
//     //         if (!body.success || body.score < 0.4) {
//     //             flag = 1
//     //             return res.status(401).json({
//     //                 message: "Something went wrong",
//     //             });
//     //         }
//     //         if (err) {
//     //             return res.status(401).json({
//     //                 message: err.toString(),
//     //             });
//     //         }
//     //     } catch (err) {
//     //         return res.status(500).json({
//     //             error: err
//     //         })
//     //     }
//     // });
//     // console.log(flag)
//     item.getItemByQuery({ email: req.body.email }, User, (err, user) => {
//         if (err) {
//             res.status(500).json({
//                 error: err,
//             });
//         } else {
//             if (user.length < 1) {
//                 return res.status(401).json({
//                     message: "Auth failed: Email not found probably",
//                 });
//             }
//             // if (user[0].isEmailVerified === false) {
//             //     return res.status(409).json({
//             //         message: "Please verify your email",
//             //     });
//             // }
//             bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//                 if (err) {
//                     return res.status(401).json({
//                         message: "Auth failed",
//                     });
//                 }
//                 if (result) {
//                     const token = jwt.sign({
//                             userType: user[0].userType,
//                             userId: user[0]._id,
//                             email: user[0].email,
//                             username: user[0].username,
//                             gender: user[0].gender,
//                         },
//                         'process.env.jwtSecret', {
//                             expiresIn: "1d",
//                         }
//                     );
//                     // req.header['auth-token'] = token;
//                     return res.status(200).json({
//                         message: "Auth successful",
//                         userDetails: {
//                             userType: user[0].userType,
//                             userId: user[0]._id,
//                             email: user[0].email,
//                             username: user[0].username,
//                             gender: user[0].gender,
//                         },
//                         token: token,
//                     });
//                 }
//                 res.status(401).json({
//                     message: "Auth failed1",
//                 });
//             });
//         }
//     });
// });

module.exports = router;
