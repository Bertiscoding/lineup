const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");

// CREATE Activity
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

    Activity.findById(activityId).then(activity => {
        // if NOT attending yet
        if (!activity.attendees.map(el => el.toString()).includes(req.user._id)) {
            Activity.findByIdAndUpdate(activityId, { $push: { attendees: req.user._id } }, { new: true })
                .then(activity => {
                    res.send(activity);
                })
                .catch(console.error);
        } else {
            Activity.findByIdAndUpdate(activityId, { $pull: { attendees: req.user._id } }, { new: true })
                .then(activity => {
                    res.send(activity);
                })
                .catch(console.error);
        }
    });
});

module.exports = router;
