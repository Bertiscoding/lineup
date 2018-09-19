const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const activitySchema = new Schema({
    title: String,
    detailActivity: String,
    date: String,
    time: String,
    attendees: Array,
    creatorId: [{ type: Schema.Types.String, ref: "User" }],
    location: {
        lat: Number,
        lng: Number
    }
});

module.exports = mongoose.model("Activities", activitySchema);
