const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");

const { createUserToken } = require("../../utils/token");

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

    Event.find({})
        .populate("attendees", "username")
        .populate("creator", "username")
        .then(events => {
            res.send(events);
        });
});

// filter Events by CREATOR
router.get("/list/creator", (req, res) => {
    // let user = req.user.username;

    Event.find({ creator: req.user._id })
        .populate("attendees", "username")
        .populate("creator", "username")
        .then(events => {
            res.send(events);
        });
});

// DELETE surf event - first attempt
router.post("/:id/delete", (req, res) => {
    const { id } = req.params;
    Event.findByIdAndRemove(id)
        .then(result => {
            res.send(result);
        })
        .catch(console.error);
});

// UPDATE surf event
router.post("/:id/update", (req, res) => {
    const { id } = req.params._id;
    Event.findByIdAndUpdate(id)
        .then(result => {
            res.send(result);
        })
        .catch(console.error);
});

// JOIN surf event

router.post("/:id/attend", (req, res, next) => {
    let eventId = req.params.id;

    Event.findById(eventId).then(event => {
        // if NOT attending yet
        if (!event.attendees.map(el => el.toString()).includes(req.user._id)) {
            Event.findByIdAndUpdate(eventId, { $push: { attendees: req.user._id } }, { new: true })
                .populate("attendees", "username")
                .populate("creator", "username")
                .then(event => {
                    res.send(event);
                })
                .catch(console.error);
        } else {
            Event.findByIdAndUpdate(eventId, { $pull: { attendees: req.user._id } }, { new: true })
                .populate("attendees", "username")
                .populate("creator", "username")
                .then(event => {
                    res.send(event);
                })
                .catch(console.error);
        }
    });
});

module.exports = router;
