require('dotenv').config();
const getWeather = require('./weather-service');

module.exports = (req, res, next) => {
    const { zip } = req.body;
    
    getWeather(zip)
        .then(res => {
            const weather = {
                temperature: res.weather.temperature,
                condition: res.weather.condition,
            };
            req.body.weather = weather;
            
            const locationFromZip = {
                city: res.location.city,
                state: res.location.state,
                zip: res.location.zip
            };
            req.body.location = locationFromZip;
            
            next();
        })
        .catch(err => {
            next(err);
        });
};
