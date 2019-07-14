const express = require("express");
const router = express.Router();
const airports = require("./airports");

// collecting all the routes in one export
router.use(airports);

module.exports = router;