const request = require('request');

const geocode = (address, callback) => {

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmE1IiwiYSI6ImNrMWFmZ3V4ZDA2MHkzb2x2YWVxc3EybzMifQ.0eBV2OPVkWABW3ltOnXgXg&limit=1';

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find address, try another one', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode;