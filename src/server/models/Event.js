const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const eventSchema = new Schema({
    detailEvent: String,
    date: Date,
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    location: String,
    comment: [
        {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            content: String
            // date: Date,
        }
    ]
});

module.exports = mongoose.model("Event", eventSchema);
