const Cloudant = require('@cloudant/cloudant');

const cloudant = new Cloudant({ account: 'mikerhodes', username: null, password: null });
const db = cloudant.use('airportdb');

const designName = 'view1';
const searchName = 'geo';

class AirportService {

  constructor(_db = db) {
    this._db = _db;
  }

  queryBy(long = 0, lat = 0, rad = 0) {
    const longNum = Number(long);
    const latNum = Number(lat);
    const radNum = Number(rad);

    const q = {
      q: `lon:[${longNum - radNum} TO ${longNum + radNum}] AND lat:[${latNum - radNum} TO ${latNum + radNum}]`
    };

    return new Promise((resolve, reject) => {
      this._db.search(designName, searchName, q, (err, result) => {
        if (err) {
          reject(`Error while retrieving resources: ${err.message}`);
        }
        resolve(result.rows.map(row => ({
          long: row.fields.lon,
          lat: row.fields.lat,
          name: row.fields.name
        })));
      });
    });
  }

}

module.exports = AirportService;