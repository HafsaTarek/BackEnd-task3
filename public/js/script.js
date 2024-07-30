let form = document.getElementById("form1");
const error = document.getElementById("error");
const locationElement = document.getElementById("location");
const forecastElement = document.getElementById("forecast");
const longitudeElement = document.getElementById("longitude");
const latitudeElement = document.getElementById("latitude");

let welcomeEl = document.getElementById("welcome");

form.addEventListener("submit", (e) => {
  error.style.display = "none";
  welcomeEl.style.display = "none";
  e.preventDefault();
  weatherFunction().then(() => {
    setTimeout(() => {
      form.reset(); // Reset the form after the function has completed
    }, 500);
  });
});

let weatherFunction = async () => {
  try {
    const address = document.getElementById("address").value;
    if (!address) {
      error.style.display = "block";
      error.textContent = "Error:Please enter a country name:";
      hideWeatherInfo();
      return;
    }

    const res = await fetch("http://localhost:3000/weather?country=" + address);
    const data = await res.json();
    console.log(data);

    if (data.error) {
      error.style.display = "block";
      error.textContent = data.error;
      hideWeatherInfo();
    } else {
      setTimeout(() => {
        showWeatherInfo(data, address);
      }, 500);
    }
  } catch (e) {
    console.log(e);
    error.style.display = "block";
    error.textContent = "An error occurred while fetching the weather data.";
    hideWeatherInfo();
  }
};

function showWeatherInfo(data, address) {
  error.textContent = "";
  locationElement.style.display = "block";
  forecastElement.style.display = "block";
  longitudeElement.style.display = "block";
  latitudeElement.style.display = "block";

  locationElement.textContent = `Country: ${address}`;
  forecastElement.textContent = `Weather: ${
    data.weather || "Weather data not available"
  } & its temp: ${data.temp || "Temperature data not available"}`;
  longitudeElement.textContent = `Longitude: ${
    data.longitude || "Not available"
  }`;
  latitudeElement.textContent = `Latitude: ${data.latitude || "Not available"}`;
}

function hideWeatherInfo() {
  locationElement.style.display = "none";
  forecastElement.style.display = "none";
  longitudeElement.style.display = "none";
  latitudeElement.style.display = "none";
}
