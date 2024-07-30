const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=b097335e0f534fce81a183301241607&q=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather API", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, {
        location: response.body.location,
        weather: response.body.current.condition.text,
        temp: response.body.current.temp_c,
        longitude,
        latitude,
      });
    }
  });
};

module.exports = forecast;
