const express = require("express");
const router = express.Router();
const { checkLoggedIn } = require("../../utils/middleware");
const axios = require("axios");

const config = require("../../config");

router.get("/:id", (req, res) => {
    const { id } = req.params;

    axios
        .get(`http://magicseaweed.com/api/${config.MAGICSEAWEED_KEY}/forecast/?spot_id=88`)
        .then(forecast => {
            res.send(forecast.data);
        });
});

module.exports = router;
