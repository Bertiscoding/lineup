const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");

// CREATE SURF EVENT
router.post("/create", (req, res) => {
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

// DISPLAY SURF EVENT

router.get("/list", (req, res) => {
    let user = req.user.username;

    Event.find({}).then(events => {
        res.send(events);
    });
});

module.exports = router;
