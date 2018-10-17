const router = require('express').Router();
const Tour = require('../models/Tour');


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
