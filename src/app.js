const port = process.env.PORT || 3000;
const path = require("path");
const express = require("express");

const app = express();

app.set("view engine", "hbs");

const viewsDirectory = path.join(__dirname, "../temp/views");
app.set("views", viewsDirectory);

app.use(express.static(path.join(__dirname, '../public')));

const geoCode = require("./tools/geoCode.js");
const forecast = require("./tools/forecast.js");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome to our website. To know a country's weather, longitude, latitude, and temp, just enter the country name:"
  });
});

app.get("/weather", (req, res) => {
  const country = req.query.country;
  if (!country) return res.send({ error: "You must provide a country" });

  geoCode(country, (error, { longitude, latitude } = {}) => {
    if (error) {
      return res.send({ error });
    }

    if (longitude === undefined || latitude === undefined) {
      return res.send({ error: "Unable to find location. Try another search." });
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        console.log('Forecast Error:', error);
        return res.send({ error });
      }

      console.log('Forecast Data:', forecastData);
      res.send({
        weather: forecastData.weather,
        temp: forecastData.temp,
        longitude: forecastData.longitude,
        latitude: forecastData.latitude,
        location: req.query.country,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("404: Page not found");
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
