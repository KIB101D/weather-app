const getWeather = async (city) => {
    if (!city) {
        displayError("Введіть назву міста!");
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0a178768b73fa365b9ac852db3d15da2&units=metric&lang=ua`
        );

        if (response.ok) {
            const data = await response.json();
            console.log("Ok", data);
            displayWeather(data);
        } else {
            if (response.status === 404) {
                displayError("Місто не знайдено 😔");
            } else {
                displayError("Помилка сервера, спробуйте пізніше");
            }
        }
    } catch (error) {
        displayError("Немає інтернету або проблема з'єднання");
    }
};

function displayWeather(data) {
    const result = document.getElementById("weather-result");

    result.innerHTML = `
        <div style="
            text-align: center;
            margin-top: 30px;
            font-family: Arial, sans-serif;
            background: #f0f8ff;
            padding: 20px;
            border-radius: 15px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        ">
            <h2 style="margin: 0; font-size: 32px;">${data.name}, ${data.sys.country}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Погода" style="width: 120px; margin: 15px 0;">
            <p style="font-size: 48px; margin: 10px 0; font-weight: bold;">${Math.round(data.main.temp)}°C</p>
            <p style="font-size: 24px; margin: 10px 0; color: #555;">
                ${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
            </p>
            <p style="margin: 10px 0; color: #666;">
                Відчувається як: ${Math.round(data.main.feels_like)}°C • 
                Вологість: ${data.main.humidity}% • 
                Вітер: ${data.wind.speed} м/с
            </p>
        </div>
    `;
}

function displayError(message) {
    const result = document.getElementById("weather-result");
    result.innerHTML = `
        <p style="
            text-align: center;
            margin-top: 30px;
            color: red;
            font-size: 20px;
            font-family: Arial, sans-serif;
        ">
            ${message}
        </p>
    `;
}

const searchBtn = document.getElementById("search");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", () => {
    const actual_city = cityInput.value.trim();
    getWeather(actual_city);
});