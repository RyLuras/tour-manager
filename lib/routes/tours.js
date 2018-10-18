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
        Tour.findByIdAndUpdate(id, { $push: { stops: req.body } }, { new: true })
            .then(tour => res.json(tour))
            .catch(next);
    })

    .delete('/:id/stops/:stop_id', (req, res, next) => {
        const { tour_id, stop_id } = req.params;
        Tour.findOneAndUpdate(tour_id, { $pull: { stops: { _id: stop_id } } }, { new: true })
            .then(stop => res.json({ deleted: !!stop }))
            .catch(next);
    });




    





    

//get / list tours
//get /id  list tour by id
//post /id/stops  pushes a stop to a tour  -- this has middleware applies to it
//(app.post('/aip/tours/stops, getlocation middleware, (req, res)) =? {
//   const locationResult === req.location.result
// tours.
//})
//get /id/stops lists stops for tour
    
//    const zipcode === req.body <---this will happen in middleware


//to push to a new stop
//$push {
//    stop: [actual array of stops]
//}
