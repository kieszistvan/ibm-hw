const express = require('express');
const AirportService = require('../services/AirportService');
const router = express.Router();

const airportService = new AirportService();

router.get('/airports', (request, response) => {
  const { long, lat, rad } = request.query;
  airportService.queryBy(long, lat, rad)
      .then((result) => response.send(result))
      .catch((err) => {
        throw err;
      });
});

module.exports = router;