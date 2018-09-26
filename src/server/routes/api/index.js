const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const eventRoutes = require("./event");
const activityRoutes = require("./activity");
const userRoutes = require("./user");
const forecastRoutes = require("./forecast");
const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);

router.get("/", (req, res) => {
    res.send({ hello: true });
});

router.use("/auth", authRoutes);
router.use("/forecast", forecastRoutes);
router.use("/event", checkLoggedIn, eventRoutes);
router.use("/activity", checkLoggedIn, activityRoutes);
router.use("/user", checkLoggedIn, userRoutes);

router.use((req, res) => {
    res.status(404).send({ error: "not-found" });
});

module.exports = router;
