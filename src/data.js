export async function getData () {

    const search = document.querySelector('#searchfield');
    const searchBtn = document.querySelector('#search-btn');
    const displayText = document.querySelector('p');

    searchBtn.addEventListener('click', async () => {
        const location = search.value.trim();

        if (!location) {
            displayText.textContent = "Please enter a location.";
            return;
        }
        try {
            const weatherForecast = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KLVCV47X6979SENLNZCDUFAGA`, { mode: 'cors' });
            if (!weatherForecast.ok) {
                throw new Error("Weather data not found. Check the location.");
            }
            const weatherData = await weatherForecast.json();

            const currentTemperature = weatherData.days[0].temp;
            displayText.textContent = `The temperature in ${location} is ${currentTemperature} Fahrenheit.`;
        } catch (error) {
            console.error(error);
            displayText.textContent = "Error fetching weather data. Please try again.";
        }
    })
}