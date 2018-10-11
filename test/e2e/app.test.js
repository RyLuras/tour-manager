require('dotenv').config();
const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');
const Chance = require('chance');
const chance = new Chance();

describe.skip('event pub/sub API', () => {
    let events = Array.apply(null, { length: 100 }).map(() => {
        return {
            type: 'purchase',
            customerId: chance.guid({ version: 4 }),
            purchaseId: chance.guid({ version: 4 })
        };
    });
    let createdEvents;

    const createEvent = event => {
        return request(app)
            .post('/api/events')
            .send(event)
            .then(res => res.body);
    };

    beforeEach(() => {
        return dropCollection('events');
    });

    beforeEach(() => {
        return Promise.all(events.map(createEvent)).then(eventsRes => {
            createdEvents = eventsRes;
        });
    });

    it('creates an event on post', () => {
        return request(app)
            .post('/api/events')
            .send({
                type: 'purchase',
                customerId: '1234',
                purchaseId: '5678'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    type: 'purchase',
                    customerId: '1234',
                    purchaseId: '5678'
                });
            });
    });

    it('gets all events on get', () => {
        return request(app)
            .get('/api/events')
            .then(retrievedEvents => {
                createdEvents.forEach(createdEvent => {
                    expect(retrievedEvents.body).toContainEqual(createdEvent);
                });
            });
    });

    it('gets an event by id', () => {
        return request(app)
            .get(`/api/events/${createdEvents[0]._id}`)
            .then(res => {
                expect(res.body).toEqual({ ...createdEvents[0], __v: expect.any(Number) });
            });
    });
});
