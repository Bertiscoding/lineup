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

    Event.find({}).then(events => {
        res.send(events);
    });
});

// JOIN surf event

router.post("/:id/attend", (req, res, next) => {
    let eventId = req.params.id;

    Event.findById(eventId).then(event => {
        // if NOT attending yet
        if (!event.attendees.includes(req.user._id)) {
            Event.findByIdAndUpdate(eventId, { $push: { attendees: req.user._id } }, { new: true })
                .then(attendee => {
                    res.send({ message: "Attending the event" });
                })
                .catch(console.error);
        } else {
            console.log("NOT attending");
            Event.findByIdAndUpdate(eventId, { $pull: { attendees: req.user._id } }, { new: true })
                .then(attendee => {
                    res.send({ message: "Not attending the event" });
                })
                .catch(console.error);
        }
    });
});

module.exports = router;
