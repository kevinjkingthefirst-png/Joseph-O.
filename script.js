const API_KEY = "6e537a4b06f44764a20230035263101";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const error = document.getElementById("error");

let hasSearched = false;

async function checkWeather(cityName) {
  try {
    error.style.display = "none";

    const res = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${cityName}&aqi=no`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    city.textContent = `${data.location.name}, ${data.location.country}`;
    temp.textContent = Math.round(data.current.temp_c) + "°c";
    humidity.textContent = data.current.humidity + "%";
    wind.textContent = Math.round(data.current.wind_kph) + " km/h";

    icon.src = "https:" + data.current.condition.icon;

  } catch {
    if (hasSearched) {
      error.textContent = "City not found";
      error.style.display = "block";
    }
  }
}

searchBtn.onclick = () => {
  const value = cityInput.value.trim();
  if (!value) return;
  hasSearched = true;
  checkWeather(value);
};

cityInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = cityInput.value.trim();
    if (!value) return;
    hasSearched = true;
    checkWeather(value);
  }
});