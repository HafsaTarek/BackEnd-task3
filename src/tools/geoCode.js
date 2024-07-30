const request = require("request");

const geocode = (address, callback) => {
  const geoCodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/San%20" +
    address +
    ".json?access_token=pk.eyJ1IjoiaGFmc2F0YXJlazM1IiwiYSI6ImNseXNrdnA4ZzAzYTQyam9uMWc2cnVzejUifQ.pSw7w5e0n4kkxH_UqnxQFw";

  request({ url: geoCodeURL, json: true }, (error, response) => {
    if (error) {
      callback("Invalid URl, can't reach geocoding api service", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length === 0) {
      callback("Error:Invalid Country Name", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;