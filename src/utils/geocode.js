const request = require('request');

const geocode = function (location, callback) {
    // mapbox pubkey for rdhanai
    // const mapboxKey = 'pk.eyJ1IjoicmRoYW5haSIsImEiOiJja2U5bHBwYjkyN3AwMnNwOGZudzZuZW5jIn0.BBJugkm_oTM8v-MAtpSsAQ';

    const pKey = 'pk.eyJ1IjoicmRoYW5haSIsImEiOiJja2U5bHBwYjkyN3AwMnNwOGZudzZuZW5jIn0.BBJugkm_oTM8v-MAtpSsAQ';
    const getCoordURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${pKey}`;
    request({
        url: getCoordURL,
        json: true
    }, (error, {body}) => {
        if (error) {
            console.log(error);
            callback('unable to connet to service');
        } else if (body.features.length === 0) {
            callback('unable to find location, try another search');
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            callback(null, {
                latitude,
                longitude,
                location 
            });
        }
    });

}

module.exports = geocode