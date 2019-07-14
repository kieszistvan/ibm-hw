const express = require('express');
const AirportService = require('../services/AirportService');
const router = express.Router();

const airportService = new AirportService();

router.get('/airports', (request, response) => {
  const res = airportService.queryBy(request.query.long, request.query.lat, request.query.rad);
  res
      .then((result) => response.send(result))
      .catch((err) => {
        console.err('Error while fetching airports', err);
        throw err;
      });
});

module.exports = router;