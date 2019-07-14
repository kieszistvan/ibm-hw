const Cloudant = require("@cloudant/cloudant");

const cloudant = new Cloudant({ account: "mikerhodes", username: null, password: null });
const db = cloudant.use("airportdb");

class AirportService {

  static get INDEX_DESIGN_NAME() { return "view1"; }
  static get INDEX_SEARCH_NAME() { return "geo"; }

  constructor (_db = db) {
    this._db = _db;
  }

  queryBy(long, lat, rad = 0) {
    const longNum = Number(long);
    const latNum = Number(lat);
    const radNum = Number(rad);

    const q = {
      q: `lon:[${longNum - radNum} TO ${longNum + radNum}] AND lat:[${latNum - radNum} TO ${latNum + radNum}]`
    };
    console.log(`Looking up airport database using query "${q.q}"`);

    return new Promise((resolve, reject) => {
      this._db.search(AirportService.INDEX_DESIGN_NAME, AirportService.INDEX_SEARCH_NAME, q, (err, result) => {
        if (err) {
          reject(`Error while retrieving resources: ${err.message}`);
        }
        console.log(`Found ${result.total_rows} airports`);
        resolve(result.rows.map(row => ({
          long: row.fields.lon,
          lat: row.fields.lat,
          name: row.fields.name
        })));
      })
    })
  }

}

module.exports = AirportService;