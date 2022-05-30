import "./style.css";

class Location {
    constructor(name) {
        this.name = name;
    }
    async fetchData() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${this.name}&units=metric&APPID=21aa6ecbbe7f60001df5a96e864081a4`,
                { mode: "cors" }
            );
            const data = await response.json();
            this.name = data.name;
            this.weather = data.weather[0].main;
            this.weatherDescription = data.weather[0].description;
            this.temp = data.main.temp;
            this.feelsLike = data.main.feels_like;
            this.pressure = data.main.pressure;
            this.humidity = data.main.humidity;
            this.minTemp = data.main.temp_min;
            this.maxTemp = data.main.temp_max;
            this.country = data.sys.country;
            this.valid = true;
        } catch {
            this.valid = false;
        }
    }
}

const DisplayController = (() => {
    const locationName = document.querySelector(".location-name");
    const locationCountry = document.querySelector(".location-country");
    const weatherName = document.querySelector(".weather-name");
    const weatherDescription = document.querySelector(".weather-description");
    const temperature = document.querySelector(".temp > div.info");
    const feelsLike = document.querySelector(".feels-like > div.info");
    const minTemp = document.querySelector(".min-temp > div.info");
    const maxTemp = document.querySelector(".max-temp > div.info");
    const humidity = document.querySelector(".humidity > div.info");
    const pressure = document.querySelector(".pressure > div.info");
    const updateInfo = (currentLocation) => {
        locationName.textContent = currentLocation.name;
        locationCountry.textContent = currentLocation.country;
        weatherName.textContent = currentLocation.weather;
        weatherDescription.textContent = currentLocation.weatherDescription;
        temperature.textContent = `${currentLocation.temp} °C`;
        feelsLike.textContent = `${currentLocation.feelsLike} °C`;
        minTemp.textContent = `${currentLocation.minTemp} °C`;
        maxTemp.textContent = `${currentLocation.maxTemp} °C`;
        humidity.textContent = `${currentLocation.humidity} %`;
        pressure.textContent = `${currentLocation.pressure} hPa`;
    };
    return {
        updateInfo,
    };
})();

async function initialize() {
    const defaultLocation = new Location("Hong Kong");
    await defaultLocation.fetchData();
    DisplayController.updateInfo(defaultLocation);
    const locationInput = document.querySelector("input");
    locationInput.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const newLocation = new Location(locationInput.value);
            await newLocation.fetchData();
            locationInput.value = "";
            if (newLocation.valid) {
                DisplayController.updateInfo(newLocation);
                locationInput.setAttribute(
                    "placeholder",
                    "Enter your favorite city!"
                );
            } else {
                locationInput.setAttribute(
                    "placeholder",
                    "Please enter a valid city"
                );
            }
        }
    });
}

initialize();
