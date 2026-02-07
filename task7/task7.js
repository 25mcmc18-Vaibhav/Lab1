const searchInput = document.getElementById('city-search');
const searchButton = document.getElementById('search-trigger');
const displayArea = document.getElementById('weather-display');
const API_KEY_VAL = "e88a8b49ea1acf43fa3361e94b9c4979";
searchButton.addEventListener('click', () => {
    const cityName = searchInput.value.trim();
    if (cityName === "") {
        showError("Please enter a valid city name.");
        return;
    }
    handleWeatherFetch(cityName);
});
async function handleWeatherFetch(city) {
    displayArea.innerHTML = `<p>Scanning skies...</p>`;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_VAL}&units=metric`;
        const response = await fetch(url);
        const json = await response.json();
        const result = json;
        if (result.cod === 200) {
            updateUI(result);
        }
        else {
            const errorResult = result;
            showError(errorResult.message);
        }
    }
    catch (err) {
        showError("Network failed. Please check your connection.");
    }
}
function updateUI(data) {
    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].main;
    const desc = data.weather[0].description;
    displayArea.innerHTML = `
        <div class="weather-info">
            <h3>${data.name}</h3>
            <p><strong>${temp}°C</strong></p>
            <p>${condition} (${desc})</p>
            <p>Humidity: ${data.main.humidity}%</p>
        </div>
    `;
}
function showError(message) {
    displayArea.innerHTML = `<p class="error-msg">⚠️ ${message}</p>`;
}
