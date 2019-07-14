const express = require("express");
const AirportService = require("../services/airport");
const router = express.Router();

const airportService = new AirportService();

router.get("/", (request, response) => {
  const res = airportService.queryBy(45, 60, 5);
  res.then((result) => response.send(result));
});

module.exports = router;