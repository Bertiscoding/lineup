const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");
const { checkLoggedIn } = require("../../utils/middleware");

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

module.exports = router;
