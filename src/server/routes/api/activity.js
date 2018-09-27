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
        location,
        comment
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

    Activity.find({})
        .populate("attendees", "username")
        .populate("creator", "username")
        .populate("comment.user", "username")
        .sort({ date: 1 })
        .then(activities => {
            res.send(activities);
        });
});

// show only ONE activity
router.get("/:id", (req, res) => {
    Activity.findById(req.params.id)
        .populate("attendees", "username")
        .populate("creator", "username")
        .then(activity => {
            res.send(activity);
        });
});

// filter activity by CREATOR
router.get("/list/creator", (req, res) => {
    Activity.find({ creator: req.user._id })
        .populate("attendees", "username")
        .populate("creator", "username")
        .then(activities => {
            res.send(activities);
        });
});

// DELETE activity
router.post("/:id/delete", (req, res) => {
    const { id } = req.params;
    Activity.findByIdAndRemove(id)
        .then(result => {
            res.send(result);
        })
        .catch(console.error);
});

// UPDATE activity
router.post("/:id/update", (req, res) => {
    const id = req.params.id;
    let { activity, date, location, title, detailActivity } = req.body;
    Activity.findByIdAndUpdate(id, { date, location, title, detailActivity }, { new: true })
        .then(result => {
            res.send({
                success: true,
                result
            });
        })
        .catch(console.error);
});

// JOIN activity
router.post("/:id/attend", (req, res, next) => {
    let activityId = req.params.id;

    Activity.findById(activityId).then(activity => {
        // if NOT attending yet
        if (!activity.attendees.map(el => el.toString()).includes(req.user._id)) {
            Activity.findByIdAndUpdate(activityId, { $push: { attendees: req.user._id } }, { new: true })
                .populate("attendees", "username")
                .populate("creator", "username")
                .then(activity => {
                    res.send(activity);
                })
                .catch(console.error);
        } else {
            Activity.findByIdAndUpdate(activityId, { $pull: { attendees: req.user._id } }, { new: true })
                .populate("attendees", "username")
                .populate("creator", "username")
                .then(activity => {
                    res.send(activity);
                })
                .catch(console.error);
        }
    });
});

// activity group chat
router.post("/:id/chat", (req, res) => {
    let id = req.params.id;

    Activity.findByIdAndUpdate(
        id,
        {
            $push: { comment: { user: req.user._id, content: req.body.comment } }
        },
        { new: true }
    )
        .then(comment => {
            res.send(comment);
        })
        .catch(console.error);
});

module.exports = router;
