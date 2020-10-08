import { geocode, getWeatherData } from './apis.js';


// Render CURRENT Weather HTML

const renderWeatherHtml = (weather) => {
    return `<h3>Currently:</h3>
            <canvas id="icon1" width="128" height="128"></canvas>
            <script src="./skycons.js" type="text/javascript"></script>
            <script type="text/javascript">
                var skycons = new Skycons({"color" : "aliceblue"});
                skycons.add("icon1", "${weather.icon}");
                skycons.play();
            </script>
            <p>${weather.summary}, with a temperature of ${Math.floor(weather.temperature)}˚c</p>`;
};

const renderWeather = (weather) => {
    // Converting from Fahrenheit to Celsius
    $('#weather').html(renderWeatherHtml(weather));
};


// Render Forecast Boxes with Correct Days.

let getDate = new Date();
let today = getDate.getDay();
console.log(today);

let forecastBoxes = [$('#forecast1'), $('#forecast2'), $('#forecast3'), $('#forecast4'),
$('#forecast5'), $('#forecast6'), $('#forecast7')];

const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const renderForecastDays = () => {
    for (let i = 0; i < forecastBoxes.length; i++) {
        if (today <= 6) {
            forecastBoxes[i].html(`<h3>${daysArr[today]}</h3>`);
            today++;
        } else {
            today = 0;
            forecastBoxes[i].html(`<h3>${daysArr[today]}</h3>`);
            today++;
        };        
    }
};

// Render FORECAST weather

const renderForecastHtml = (weather) => {

    let iconColor;

    switch (weather.icon) {
        case 'clear-day':
            iconColor = "gold";
            break;
        case 'rain':
            iconColor = "#00659F";
            break;
        case 'partly-cloudy-day':
            iconColor = '#5CC3FE';
            break;
        case 'cloudy':
            iconColor = '#6f6f6f';
            break;
    };


    console.log(`Logging Today is: ${weather.summary}`);
    console.log(weather);
    return `<p>${weather.summary}</p>
            <canvas id="${weather.sunriseTime}" width="128" height="128"></canvas>
            <script src="./skycons.js" type="text/javascript"></script>
            <script type="text/javascript">
                var skycons = new Skycons({ "color" : "${iconColor || 'black'}"});
                skycons.add("${weather.sunriseTime}", "${weather.icon}");
                skycons.play();
            </script>
            <p class="max-temp">Max Temp: ${Math.floor(weather.temperatureMax)}&deg;c</p>
            <p class="min-temp">Min Temp: ${Math.floor(weather.temperatureMin)}&deg;c</p>`;
};

const renderForecast = (weather) => {
    renderForecastDays();
    forecastBoxes[0].append('<p>That\'s today!</p>');

    for (let i = 0; i < weather.data.length - 1; i++) {
        forecastBoxes[i].append(renderForecastHtml(weather.data[i]));
    };
};



export { renderForecastHtml, renderForecast, renderWeather, renderForecastDays };