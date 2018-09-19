const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");
const { checkLoggedIn } = require("../../utils/middleware");
// const jwt = require("jsonwebtoken");

// CREATE SURF EVENT
router.post("/create", checkLoggedIn, (req, res) => {
    const { detailEvent, location, date } = req.body;

    new Event({
        creator: req.user._id,
        detailEvent,
        location,
        date
    })
        .save()
        .then(event => {
            res.send(event);
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;
