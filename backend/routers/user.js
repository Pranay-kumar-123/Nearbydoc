router.post("/signup", async(req, res, next) => {

    item.getItemByQuery({ email: req.body.email }, User, (err, user) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            if (user.length >= 1) {
                res.status(409).json({
                    message: "Email already exists",
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = {
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            mobileNumber: req.body.mobileNumber,
                            isEmailVerified: false,
                        };
                        item.createitem(user, User, async(err, result) => {
                            if (err) {
                                res.status(500).json({
                                    error: err,
                                });
                            } else {
                                result.verificationKey = shortid.generate();
                                result.verificationKeyExpires =
                                    new Date().getTime() + 20 * 60 * 1000;
                                await result
                                    .save()
                                    .then((result1) => {
                                        const msg = {
                                            to: result.email,
                                            from: process.env.sendgridEmail,
                                            subject: "Quizzie: Email Verification",
                                            text: " ",
                                            html: emailTemplates.VERIFY_EMAIL(result1),
                                        };

                                        sgMail
                                            .send(msg)
                                            .then((result) => {
                                                console.log("Email sent");
                                            })
                                            .catch((err) => {
                                                console.log(err.toString());
                                                res.status(500).json({
                                                    // message: "something went wrong1",
                                                    error: err,
                                                });
                                            });
                                        res.status(201).json({
                                            message: "user created",
                                            userDetails: {
                                                userId: result._id,
                                                email: result.email,
                                                name: result.name,
                                                mobileNumber: result.mobileNumber,
                                            },
                                        });
                                    })
                                    .catch((err) => {
                                        res.status(400).json({
                                            message: "Error",
                                            error: err.toString(),
                                        });
                                    });
                            }
                        })
                    }

                })
            }
        }
    })

});