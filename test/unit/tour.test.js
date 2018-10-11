const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/Tour');
const Chance = require('chance');
const chance = new Chance();

describe.skip('Tours model', () => {
    it('validates a good model', () => {
        const data = {
            type: 'purchase',
            customerId: chance.guid(),
            purchaseId: chance.guid()
        };

        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        expect(jsonTour).toEqual({ ...data, _id: expect.any(Object) });
    });

    it('tour type is required', () => {
        const tour = new Tour({
            purchaseId: chance.guid(),
            customerId: chance.guid()
        });

        const errors = getErrors(tour.validateSync(), 1);
        expect(errors.type.properties.message).toEqual('Path `type` is required.');
    });
});
