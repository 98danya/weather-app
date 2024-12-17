export async function getData() {
  const search = document.querySelector("#searchfield");
  const displayText = document.querySelector("p");
  const temperatureText = document.querySelector("#temperature");
  const toggleBtn = document.querySelector("#toggleBtn");
  const temp = document.getElementById("temp");

  let currentTempCelsius = null;
  let currentTempFahrenheit = null;
  let isFahrenheit = true;

  toggleBtn.addEventListener("click", async () => {
    const location = search.value.trim();

    if (!location) {
        displayText.textContent = "Please enter a location.";
        return;
      } else {
        displayText.textContent = ""; // Clear the message when a location is entered
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
      currentTempFahrenheit = weatherData.days[0].temp;
      currentTempCelsius = ((currentTempFahrenheit - 32) * 5) / 9;

      document.getElementById("location").textContent =
        weatherData.resolvedAddress;
      document.getElementById("conditions").textContent =
        weatherData.currentConditions.conditions;
      document.getElementById("description").textContent =
        weatherData.description;

      if (isFahrenheit) {
        temp.textContent = `${currentTempFahrenheit.toFixed(1)}°F`;
        toggleBtn.textContent = "°C";
      } else {
        temp.textContent = `${currentTempCelsius.toFixed(1)}°C`;
        toggleBtn.textContent = "°F";
      }

      isFahrenheit = !isFahrenheit;
    } catch (error) {
      console.error(error);
      displayText.textContent =
        "Error fetching weather data. Please try again.";
    }
  });
}
