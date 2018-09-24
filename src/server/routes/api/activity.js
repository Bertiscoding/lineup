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

// JOIN activity

router.post("/:id/attend", (req, res, next) => {
    let activityId = req.params.id;

    Event.findById(activityId).then(event => {
        // if NOT attending yet
        if (!event.attendees.map(el => el.toString()).includes(req.user._id)) {
            Event.findByIdAndUpdate(eventId, { $push: { attendees: req.user._id } }, { new: true })
                .then(event => {
                    res.send(event);
                })
                .catch(console.error);
        } else {
            Event.findByIdAndUpdate(activityId, { $pull: { attendees: req.user._id } }, { new: true })
                .then(event => {
                    res.send(event);
                })
                .catch(console.error);
        }
    });
});

module.exports = router;
