const request = require('request');

const forecast = function (latitude, longitude, callback) {
    // weatherstack pubkey for rajpal.dhanai@gmail.com
    // const weatherStackKey = '1689a643cdcf0571d86541791b40d0b1';

    const pKey = '1689a643cdcf0571d86541791b40d0b1';
    const currentWeatherURL = `http://api.weatherstack.com/current?access_key=${pKey}&query=${latitude},${longitude}`;
    request({
        url: currentWeatherURL,
        json: true
    }, (error,  { body } ) => {
        if (error) {
            callback(error, null);
        } else {
            const data = {
                temperature: body.current.temperature,
                precip: body.current.precip,
                feelslike: body.current.feelslike
            } 
            callback(null, data);
        }
    });
}

module.exports = forecast
