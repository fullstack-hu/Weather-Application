const API_KEY = 'e82d0923a7081d0f35531a65c51b4d83'; // Replace with your OpenWeatherMap API key

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const localTimeEl = document.getElementById("localTime");
//const hourlyEl = document.getElementById("hourly");
//const weeklyEl = document.getElementById("weekly");
let bd = document.querySelector("#body-main");

function formatTime(timestamp, timezone) {
  const local = new Date((timestamp + timezone) * 1000);
  return local.toUTCString().slice(17, 22);
}

function searchCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;
  fetchWeather(city);
}

function fetchWeather(city) {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  fetch(currentUrl)
    .then(res => res.json())
    .then(data => {
      displayCurrent(data);
      fetchForecast(data.coord.lat, data.coord.lon, data.timezone);
    });
}

function displayCurrent(data) {
  cityNameEl.textContent = data.name;
  tempEl.textContent = `${Math.round(data.main.temp)} °C`;
  descriptionEl.textContent = data.weather[0].description;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${data.wind.speed} km/h`;
  visibilityEl.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
  pressureEl.textContent = `${data.main.pressure} mb`;
  localTimeEl.textContent = `🕒 ${formatTime(data.dt, data.timezone)}`;
}


function fetchForecast(lat, lon, timezone) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayHourly(data.hourly.slice(0, 6), timezone);
      displayWeekly(data.daily.slice(1, 7));
    });
}

/*function displayHourly(hourlyData, timezone) {
  hourlyEl.innerHTML = "";
  hourlyData.forEach(hour => {
    const hourEl = document.createElement("div");
    hourEl.innerHTML = `
      <p>${formatTime(hour.dt, timezone)}</p>
      <p>${Math.round(hour.temp)}°C</p>
      <p>${hour.weather[0].main}</p>
    `;
    hourlyEl.appendChild(hourEl);
  });
}

function displayWeekly(dailyData) {
  weeklyEl.innerHTML = "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dailyData.forEach(day => {
    const dayEl = document.createElement("div");
    const date = new Date(day.dt * 1000);
    dayEl.innerHTML = `
      <p>${days[date.getDay()]}</p>
      <p>${Math.round(day.temp.day)}°C</p>
      <p>${day.weather[0].main}</p>
    `;
    weeklyEl.appendChild(dayEl);
  });
}*/

// Default city on load
fetchWeather("Pune");
