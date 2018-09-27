const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const activitySchema = new Schema({
    title: String,
    detailActivity: String,
    date: Date,
    attendees: [{ type: Schema.Types.String, ref: "User" }],
    creator: { type: Schema.Types.String, ref: "User" },
    location: String,
    comment: [
        {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            content: String
            // date: Date,
        }
    ]
});

module.exports = mongoose.model("Activity", activitySchema);
