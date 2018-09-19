const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const upload = require("../../utils/upload");
const axios = require("axios");

router.post("/sign-up", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).send({ error: "Missing Credentials." });

    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) return res.status(400).send({ error: "E-Mail exists already." });
        })
        .then(result => {
            const hashedPassword = bcrypt.hashSync(password, 10);
            return new User({ email, password: hashedPassword }).save();
        })

        .then(user => {
            const token = jwt.sign({ _id: user._id, email: user.email }, config.SECRET_JWT_PASSPHRASE);
            console.log(token);
            res.send({ token });
        });
});

// CREATE FULL PROFILE

// if(isSetup) return res.render("/") -> check if user has created profile already
// http://localhost:3000/api/auth/newuser
router.get("/newuser", (req, res) => {
    if (req.user) {
        const userId = req.user._id;
        console.log(userId);
        res.send(userId);
    } else res.redirect("/");
});

router.post("/newuser/:id", (req, res) => {
    const { username, age, description, skilllevel } = req.body;
    const { id } = req.params;
    console.log("ID: ", id);

    User.findUserById({ id })
        .then(user => {
            return req.files && req.files.picture ? upload(req.files.picture) : Promise.resolve();
        })
        .then(pictureUrl => {
            return new User({
                username,
                age,
                description,
                skilllevel,
                profilePicture: pictureUrl
            }).save();
        });
});

router.post("/sign-in", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).send({ error: "Missing Credentials." });

    User.findOne({ email }).then(existingUser => {
        if (!existingUser) return res.status(400).send({ error: "User does not exist." });

        const passwordsMatch = bcrypt.compareSync(password, existingUser.password);

        if (!passwordsMatch) return res.status(400).send({ error: "Password is incorrect." });

        const token = jwt.sign(
            {
                _id: existingUser._id,
                email: existingUser.email,
                profilePicture: existingUser.profilePicture
            },
            config.SECRET_JWT_PASSPHRASE
        );
        res.send({ token });
    });
});

module.exports = router;
