import "./style.css";

class Location {
    constructor(name) {
        this.name = name;
        this.#fetchData();
    }
    async #fetchData() {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${this.name}&units=metric&APPID=21aa6ecbbe7f60001df5a96e864081a4`
        );
        const data = await response.json();
        console.log(data);
        this.weather = data.weather[0].main;
        this.weatherDescription = data.weather[0].description;
        this.temp = data.main.temp;
        this.feelsLike = data.main.feels_like;
        this.pressure = data.main.pressure;
        this.humidity = data.main.humidity;
        this.minTemp = data.main.temp_min;
        this.maxTemp = data.main.temp_max;
        this.country = data.sys.country;
    }
}

let test = new Location("London");
console.log(test);
