const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/Tour');

describe('Tours model', () => {
    it('validates a good model', () => {
        const data = {
            title: 'purchase',
            activities: ['rockin', 'rollin'],
            launchDate: new Date()
        };

        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        expect(jsonTour).toEqual({ ...data, stops: [] });
    });

    it('tour title is required', () => {
        const tour = new Tour({
            activities: ['rockin', 'rollin'],
            launchDate: new Date()
        });

        const errors = getErrors(tour.validateSync(), 1);
        expect(errors.title.properties.message).toEqual('Path `title` is required.');
    });
});
