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
                launchDate: Date.now()
            })
            .then(res => {
                expect(res.body).toEqual({ ...res.body, stops: [] });
            });
    });

    it('gets all Tours', () => {
        return request(app)
            .get('/api/tours')
            .then(res => {
                expect(res.body).toEqual(createdTours);
            });
    });
 
});

