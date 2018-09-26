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
        date,
        comment
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
    Event.find({})
        .populate("attendees", "username")
        .populate("creator", "username")
        .populate("comment.user", "username")
        .sort({ date: 1 })
        .then(events => {
            res.send(events);
        });
});

// show only ONE event
router.get("/:id", (req, res) => {
    Event.findById(req.params.id)
        .populate("attendees", "username")
        .populate("creator", "username")
        .then(event => {
            res.send(event);
        });
});

// filter Events by CREATOR
router.get("/list/creator", (req, res) => {
    Event.find({ creator: req.user._id })
        .populate("attendees", "username")
        .populate("creator", "username")
        .populate("comment.user", "username")
        .then(events => {
            res.send(events);
        });
});

// DELETE surf event
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
    const id = req.params.id;
    let { event, date, location, detailEvent } = req.body;
    Event.findByIdAndUpdate(id, { date, location, detailEvent }, { new: true })
        .then(result => {
            res.send({
                success: true,
                result
            });
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

router.post("/:id/chat", (req, res) => {
    let id = req.params.id;

    Event.findByIdAndUpdate(
        id,
        { $push: { comment: { user: req.user._id, content: req.body.comment } } },
        { new: true }
    )
        .then(comment => {
            res.send(comment);
        })
        .catch(console.error);
});

module.exports = router;
