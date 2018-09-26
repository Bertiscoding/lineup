const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Event = require("./Event");
const Activity = require("./Activity");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    username: String,
    age: Number,
    profilePicture: {
        type: String,
        default: "/images/linup_PH.jpg"
    },
    description: String,
    skilllevel: String,
    events: [{ type: Schema.Types.String, ref: "Event" }],
    activities: [{ type: Schema.Types.String, ref: "Activity" }]
});

module.exports = mongoose.model("User", userSchema);
