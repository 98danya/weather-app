import { weatherIcon } from "./icons";

function getDayName(dateString) {
  const date = new Date(dateString);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

export async function getData() {
  const search = document.querySelector("#searchfield");
  const displayText = document.querySelector("p");
  const toggleBtn = document.querySelector("#toggleBtn");
  const temp = document.getElementById("temp");
  const tempMainContainer = document.querySelector(".temp-main-container");
  const tempForecastContainer = document.querySelector(
    ".temp-forecast-container"
  );
  const forecastContainer = document.getElementById("forecast");
  const nav = document.querySelector("nav");

  let currentTempCelsius = null;
  let currentTempFahrenheit = null;
  let isFahrenheit = true;

  toggleBtn.addEventListener("click", () => {
    nav.classList.add("moved-up");
  });

  toggleBtn.addEventListener("click", async () => {
    const location = search.value.trim();

    if (!location) {
      displayText.textContent = "Please enter a location.";
      return;
    } else {
      displayText.textContent = "";
    }
    try {
      const weatherForecast = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KLVCV47X6979SENLNZCDUFAGA`,
        { mode: "cors" }
      );
      if (!weatherForecast.ok) {
        throw new Error("Weather data not found. Check the location.");
      }
      const weatherData = await weatherForecast.json();
      tempMainContainer.style.display = "grid";
      tempForecastContainer.style.display = "grid";
      const currentConditions = weatherData.currentConditions;

      currentTempFahrenheit = weatherData.days[0].temp;
      currentTempCelsius = ((currentTempFahrenheit - 32) * 5) / 9;

      document.getElementById("location").textContent =
        weatherData.resolvedAddress;
      document.getElementById("conditions").textContent =
        weatherData.currentConditions.conditions;
      document.getElementById("description").textContent =
        weatherData.description;

      const currentIcon =
        weatherIcon[currentConditions.icon] || "./icons/default.png";

      document.getElementById(
        "weather-icon-main"
      ).innerHTML = `<img src="${currentIcon}" alt="${currentConditions.icon}" class="weather-icon-main"/>`;

      temp.innerHTML = `
        <span>${
          isFahrenheit
            ? currentTempFahrenheit.toFixed(1) + "°F"
            : currentTempCelsius.toFixed(1) + "°C"
        }</span>
      `;

      toggleBtn.textContent = isFahrenheit ? "°C" : "°F";

      forecastContainer.innerHTML = "";

      weatherData.days.slice(0, 9).forEach((day) => {
        const dayName = getDayName(day.datetime);
        const condition = day.icon;
        const iconPath = weatherIcon[condition] || "./icons/default.png";

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
          <img src="${iconPath}" alt="${condition}" class="weather-icon" />

          <p class="forecast-temp"> ${
            isFahrenheit
              ? day.temp + "°F"
              : (((day.temp - 32) * 5) / 9).toFixed(1) + "°C"
          }</p>
          <h4>${dayName}</h4>
          <h5>(${day.datetime})</h5>
          <p class="forecast-conditions">Conditions: ${condition.replace(
            /-/g,
            " "
          )}</p>
        `;
        forecastContainer.appendChild(forecastItem);
      });

      isFahrenheit = !isFahrenheit;
    } catch (error) {
      console.error(error);
      displayText.textContent =
        "Error fetching weather data. Please try again.";
    }
  });
}
