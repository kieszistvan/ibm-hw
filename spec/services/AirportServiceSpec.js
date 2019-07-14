const airports = require('./data-airports');

const dbMock = {
  search: () => {
    return 0;
  }
};

describe('AirportService', () => {
  const AirportService = require('../../server/services/AirportService');
  let service;

  beforeEach(() => {
    service = new AirportService(dbMock);
  });

  it('queryBy should return airports when arguments defined', () => {
    const expectedQuery = {q: 'lon:[0 TO 20] AND lat:[0 TO 20]'};

    spyOn(dbMock, 'search').and.callFake((dn, sn, query, callback) => {
      expect(query).toEqual(expectedQuery);
      callback(null, airports);
    });

    service.queryBy(10, 10, 10).then((result) => {
      expect(result.length).toBe(2);
      expect(result).toContain(
          {
            long: airports.rows[0].fields.lon,
            lat: airports.rows[0].fields.lat,
            name: airports.rows[0].fields.name
          },
          {
            long: airports.rows[1].fields.lon,
            lat: airports.rows[1].fields.lat,
            name: airports.rows[1].fields.name
          });
    });
  });

});
