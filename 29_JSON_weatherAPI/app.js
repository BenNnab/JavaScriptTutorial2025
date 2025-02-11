const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "a612970492c12da59df651119d8c89bd"; // Replace with your OpenWeatherMap API key

weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const city = cityInput.value.trim(); // Get the city name from the input field

    if (city) {
        try {
            const weatherData = await getWeatherData(city); // Fetch weather data
            displayWeatherInfo(weatherData); // Display the weather data
        } catch (error) {
            console.error(error);
            displayError("Could not fetch weather data. Please try again.");
        }
    } else {
        displayError("Please enter a city name.");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl); // Fetch data from the API

    if (!response.ok) {
        throw new Error("Could not fetch weather data.");
    }

    return await response.json(); // Return the JSON data
}

function displayWeatherInfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;

    // Convert temperature from Kelvin to Celsius
    const tempCelsius = (temp - 273.15).toFixed(1);

    // Clear previous content
    card.textContent = "";
    card.style.display = "flex";

    // Create and append elements to the card
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${tempCelsius}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    // Return an emoji based on the weather condition code
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
        return "🌧️"; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧️"; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; // Atmosphere (e.g., fog, haze)
    } else if (weatherId === 800) {
        return "☀️"; // Clear sky
    } else if (weatherId > 800 && weatherId < 900) {
        return "☁️"; // Clouds
    } else {
        return "❓"; // Unknown
    }
}

function displayError(message) {
    // Display an error message
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    // Clear previous content and display the error
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}