const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');

describe('validates Tour routes with Stops generated with Weather Middleware', () => {

    let tours = [
        {
            title: 'West Coast Tour',
            activities: ['Rockin', 'rollin', 'playin the blues'],
            launchDate: Date.now()
        },
        {
            title: 'East Coast Tour',
            activities: ['Rockin', 'rollin', 'playin the blues'],
            launchDate: Date.now()

        },
        {
            title: 'Great Lakes Tour',
            activities: ['Rockin', 'rollin', 'playin the blues'],
            launchDate: Date.now()

        }
    ];
    
    let createdTours;

    const createTour = tour => {
        return request(app)
            .post('/api/tours')
            .send(tour)
            .then(res => res.body);
    };

    beforeEach(() => {
        return dropCollection('tours');
    });

    beforeEach(() => {
        return Promise.all(tours.map(createTour)).then(toursRes => {
            createdTours = toursRes;
        });
    });

    it('Posts to Tour', () => {
        return request(app)
            .post('/api/tours')
            .send({
                title: 'West Coast Tour',
                activities: ['Rockin', 'rollin', 'playin the blues'],
                launchDate: Date.now(),
            })
            .then(res => {
                expect(res.body).toEqual({ ...res.body, stops: [] });
            });
    });

    it('gets all Tours', () => {
        return request(app)
            .get('/api/tours')
            .then(res => {
                expect(res.body).toContainEqual(createdTours[1]);
                expect(res.body).toContainEqual(createdTours[2]);
                expect(res.body).toContainEqual(createdTours[0]);
            });
    });
    
    it('gets a tour by id', () => {
        return request(app)
            .get(`/api/tours/${createdTours[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdTours[0]);
            });
    });

    it('adds a stop to a tour by id', () => {
        return request(app)
            .post(`/api/tours/${createdTours[0]._id}/stops`)
            .send({ zip: 94061 })
            .then(res => {
                expect(res.body.stops).toEqual([{
                    _id: expect.any(String),
                    location: {
                        city: 'Redwood City',
                        state: 'CA',
                        zip: 94061
                    },
                    weather: expect.any(Object)
                }]);
            });
    });

    it('deletes a stop by id', () => {
        return request(app)
            .post(`/api/tours/${createdTours[0]._id}/stops`)
            .send({ zip: 94061 })
            .then(res => {
                const tour_id = res.body._id;
                const stop_id = res.body.stops[0]._id;
                return request(app)
                    .delete(`/api/tours/${tour_id}/stops/${stop_id}`)
                    .then(res => {
                        expect(res.body).toEqual({ deleted: true });
                    });
            });
            
    });

    it('updates the attendance of a stop', () => {
        return request(app)
            .post(`/api/tours/${createdTours[0]._id}/stops`)
            .send({ zip: 94061 })
            .then(res => {
                const tour_id = res.body._id;
                const stop_id = res.body.stops[0]._id;
                return request(app)
                    .post(`/api/tours/${tour_id}/stops/${stop_id}/attendance`)
                    .send({ attendance: 666 })
                    .then(res => {
                        expect(res.body.stops[0].attendance).toEqual(666);
                    });
            });
    });
});
