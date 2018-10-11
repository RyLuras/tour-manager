const getLocation = require('./weather-service');

module.exports = (req, res, next) => {

    const { zip } = req.body;
    getLocation(zip)
        .then(locationInfo => {
            req.stop = locationInfo;
            next();
        });
};
