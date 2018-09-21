const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");

// CREATE SURF EVENT
router.post("/create", (req, res) => {
    const { title, detailActivity, date, location } = req.body;

    new Activity({
        creator: req.user._id,
        title,
        detailActivity,
        date,
        location
    })
        .save()
        .then(act => {
            res.send(act);
        })
        .catch(err => {
            console.error(err);
        });
});

// DISPLAY ACTIVITY

router.get("/list", (req, res) => {
    let user = req.user.username;

    Activity.find({}).then(activities => {
        res.send(activities);
    });
});

module.exports = router;
