const express = require("express");
const AirportService = require("../services/airport");
const router = express.Router();

const airportService = new AirportService();

router.get("/airports", (request, response, next) => {
  const res = airportService.queryBy(request.query.long, request.query.lat, request.query.rad);
  res
    .then((result) => response.send(result))
    .catch((err) => next(err));
});

module.exports = router;