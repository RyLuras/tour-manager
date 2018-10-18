const location = require('../../lib/util/location');

describe('location middleware', () => {

    it('passes weather data from given zip code into req.body and sends to next()', done => {

        const req = { body: { zip: 94061 } };
        let called = false;
        
        const next = () => {
            called = true;

            const weatherObj = { 
                city: 'Redwood City', 
                state: 'CA', 
                zip: '94061' 
            };

            expect(req.stop.location).toEqual(weatherObj);
            expect(req.stop.weather.temperature).toEqual(expect.any(String));
            expect(req.stop.weather.condition).toEqual(expect.any(String));
            expect(called).toBeTruthy();
            done();
        };
    
        location(req, null, next); 
    });

    it('returns an error if passed a bogus zipcode', done => {
        const req = { body: { zip: 'abc' } };
    
        const next = err => {
            expect(err).toBeTruthy();
            done();
        };

        location(req, null, next);
    });
});

