const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const chatSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
    date: Date
});

module.exports = mongoose.model("Chat", chatSchema);
