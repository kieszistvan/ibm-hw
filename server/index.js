const AirportService = require("./services/airport");

const airportService = new AirportService();

const res = airportService.queryBy(45, 60, 5);
res.then((result) => result.forEach(e => console.log(e)));