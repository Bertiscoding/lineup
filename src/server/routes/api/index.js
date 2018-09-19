const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const eventRoutes = require("./event");
const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);

router.get("/", (req, res) => {
    res.send({ hello: true });
});

router.use("/auth", authRoutes);
router.use("/event", checkLoggedIn, eventRoutes);

router.use((req, res) => {
    res.status(404).send({ error: "not-found" });
});

module.exports = router;
