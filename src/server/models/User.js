const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Events = require("./Events");
const Activities = require("./Activities");

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
        default: "../public/images/shirt_octi2.jpg"
    },
    description: String,
    skilllevel: String,
    events: [{ type: Schema.Types.String, ref: "Events" }],
    activities: [{ type: Schema.Types.String, ref: "Activities" }]
});

module.exports = mongoose.model("User", userSchema);
