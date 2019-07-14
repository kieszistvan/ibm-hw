const Cloudant = require("@cloudant/cloudant");

const cloudant = new Cloudant({ account: "mikerhodes", username: null, password: null });
const db = cloudant.use("airportdb");

class AirportService {

  static get INDEX_DESIGN_NAME() { return "view1"; }
  static get INDEX_SEARCH_NAME() { return "geo"; }

  constructor (_db = db) {
    this._db = _db;
  }

  queryBy(long, lat, rad) {
    const q = { q: `lon:[${long} TO ${long+rad}] AND lat:[${lat} TO ${lat+rad}]` };
    console.log(`Looking up airport database using query "${q.q}"`);

    return new Promise((resolve, reject) => {
      this._db.search(AirportService.INDEX_DESIGN_NAME, AirportService.INDEX_SEARCH_NAME, q, (err, result) => {
        if (err) {
          reject(`Error while retrieving resources: ${err.message}`);
        }
        resolve(result.rows.map(row => ({
          id: row.id,
          long: row.fields.lon,
          lat: row.fields.lat
        })));
      })
    })
  }

}

module.exports = AirportService;