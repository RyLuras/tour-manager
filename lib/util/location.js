require('dotenv').config();
const { HttpError } = require('./errors');
const getWeather = require('./weather-service');

module.exports = (req, res, next) => {


    if(req.body.zip) {
        getWeather(req.body.zip)
            .then(data => {
                req.stop = data;
                next();
            });
    }
    else {
        const error = new HttpError({
            code: 400,
            message: 'Zip Code Required'
        });
        next(error);
    }
};
