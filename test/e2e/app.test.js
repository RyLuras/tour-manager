const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');


describe('validates Tour routes with Stops generated with Weather Middleware', () => {

    it('Posts to Studio', () => {
        return request(app)
            .post('/api/tours')
            .send({
                title: 'West Coast Tour',
                activities: ['Rockin', 'rollin', 'playin the blues'],
                launchDate: Date.now()
            })
            .then(res => {
                expect(res.body).toEqual({ ...res.body, stops: [] });
            });
    });


});
