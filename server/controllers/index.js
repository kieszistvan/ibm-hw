const express = require("express");
const router = express.Router();
const airports = require("./airports");

router.use("/airports", airports);

module.exports = router;