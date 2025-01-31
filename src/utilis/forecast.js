const request = require('request');

const forecast = (latitude, langitude, callback) => {
  const url = 'https://api.darksky.net/forecast/64287d6c7750f9f1f801757464be4b07/' + latitude + ',' + langitude + '?units=si';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location...', undefined);
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. Maximum temperature is ${body.daily.data[0].temperatureHigh}`)
    }
  })
}

module.exports = forecast;