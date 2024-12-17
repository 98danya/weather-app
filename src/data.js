export async function getData() {
  const search = document.querySelector("#searchfield");
  const displayText = document.querySelector("p");
  const temperatureText = document.querySelector("#temperature");
  const toggleBtn = document.querySelector("#toggleBtn");

  let currentTempCelsius = null;
  let currentTempFahrenheit = null;
  let isFahrenheit = true;

  toggleBtn.addEventListener("click", async () => {
    const location = search.value.trim();

    if (!location) {
      displayText.textContent = "Please enter a location.";
      return;
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

      if (isFahrenheit) {
        temperatureText.textContent = `The temperature in ${location} is ${currentTempFahrenheit.toFixed(
          1
        )}°F.`;
        toggleBtn.textContent = "°C";
      } else {
        temperatureText.textContent = `The temperature in ${location} is ${currentTempCelsius.toFixed(
          1
        )}°C.`;
        toggleBtn.textContent = "°F";
      }
    } catch (error) {
      console.error(error);
      displayText.textContent =
        "Error fetching weather data. Please try again.";
    }
    isFahrenheit = !isFahrenheit;
  });
}
