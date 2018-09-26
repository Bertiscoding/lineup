const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const upload = require("../../utils/upload");
const { checkLoggedIn } = require("../../utils/middleware");

// SIGN UP

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
            const jsonUser = user.toObject();
            delete jsonUser.password;

            const token = jwt.sign(jsonUser, config.SECRET_JWT_PASSPHRASE);
            res.send({ token });
        });
});

// SIGN IN

router.post("/sign-in", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) res.status(400).send({ error: "Missing Credentials." });

    User.findOne({ email }).then(existingUser => {
        if (!existingUser) return res.status(400).send({ error: "User does not exist." });

        const passwordsMatch = bcrypt.compareSync(password, existingUser.password);

        if (!passwordsMatch) return res.status(400).send({ error: "Password is incorrect." });

        const jsonUser = existingUser.toObject();
        delete jsonUser.password;

        const token = jwt.sign(jsonUser, config.SECRET_JWT_PASSPHRASE);

        res.send({ token });
    });
});

// CREATE FULL PROFILE

router.post("/newuser", checkLoggedIn, (req, res) => {
    const { username, age, description, skilllevel } = req.body;

    const p = req.files && req.files.picture ? upload(req.files.picture) : Promise.resolve(undefined);
    p.then(pictureUrl => {
        const updateData = {
            username,
            age,
            description,
            skilllevel
        };
        if (pictureUrl) updateData.profilePicture = pictureUrl;

        return User.findByIdAndUpdate(req.user._id, updateData, { new: true });
    })
        .then(user => {
            const jsonUser = user.toObject();
            delete jsonUser.password;
            console.log(jsonUser);
            const token = jwt.sign(jsonUser, config.SECRET_JWT_PASSPHRASE);

            res.send({ token });
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;
