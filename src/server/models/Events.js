const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const eventSchema = new Schema({
    detailEvent: String,
    date: String,
    time: String,
    attendees: Array,
    creatorId: [{ type: Schema.Types.String, ref: "User" }],
    location: {
        lat: Number,
        lng: Number
    }
});

module.exports = mongoose.model("Events", eventSchema);
