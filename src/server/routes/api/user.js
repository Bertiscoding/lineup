const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const { checkLoggedIn } = require("../../utils/middleware");

// show One user

router.get("/:id", (req, res) => {
    User.findById(req.params.id).then(user => {
        res.send(user);
    });
});

module.exports = router;
