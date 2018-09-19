const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const eventSchema = new Schema({
    detailEvent: String,
    date: Date,
    attendees: [{ type: Schema.Types.String, ref: "User" }],
    creator: { type: Schema.Types.String, ref: "User" },
    location: String
});

module.exports = mongoose.model("Event", eventSchema);
