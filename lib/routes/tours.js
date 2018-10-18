const router = require('express').Router();
const Tour = require('../models/Tour');
const weather = require('../util/location');

module.exports = router
    .post('/', (req, res, next) => {
        const { title, activities, launchDate } = req.body;
        Tour.create({ title, activities, launchDate })
            .then(studio => res.json(studio))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Tour.find()
            .then(tours => res.json(tours))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;
        Tour.findById(id)
            .then(tour => res.json(tour))
            .catch(next);
    })


    .post('/:id/stops', weather, (req, res, next) => {
        const { id } = req.params;
        Tour.findOneAndUpdate(id, { $push: { stops: req.body } }, { new: true })
            .lean()
            .then(tour => res.json(tour))
            .catch(next);
    })

    .delete('/:id/stops/:stop_id', (req, res, next) => {
        const { tour_id, stop_id } = req.params;
        Tour.findOneAndUpdate(tour_id, { $pull: { stops: { _id: stop_id } } }, { new: true })
            .lean()
            .then(stop => res.json({ deleted: !!stop }))
            .catch(next);
    })

    .post('/:id/stops/:stop_id/attendance', (req, res, next) => {
        const { tour_id, stop_id } = req.params;
        const { attendance } = req.body;
        Tour.findOneAndUpdate({ '_id': tour_id, 'stops._id': stop_id }, 
            { $setOnInsert: { 'stops.$.attendance': attendance } }, 
            { new: true })
            .then(stop => res.json(stop))
            .catch(next);
    });
