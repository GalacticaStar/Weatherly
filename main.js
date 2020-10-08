import { geocode, getAddress, getWeatherData } from './apis.js';
import { renderForecastHtml, renderForecast, renderWeather } from './renders.js';

const $submit = $('#button');
console.log("testing");
$('.loading').hide();

// Calling from APIs to get weather.

const getWeather = (locationQuery) => {
    geocode(locationQuery)
    .then(coords => {
        getWeatherData(coords)
        .then(jsonResponse => {
           console.log(jsonResponse.currently.temperature);
           renderWeather(jsonResponse.currently);
           renderForecast(jsonResponse.daily);
           $('.loading').hide();
           $('.weather-box').show();
        });
    });
};

// Click to submit data and render

$submit.click((e) => {

    $('.weather-box').hide();
    // AJAX event handling
    $('.loading').show();

    // Fetch query from user input
    const locationQuery = document.getElementById('city').value;
    console.log(locationQuery);

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Uncomment when finsihed with style changes

    getAddress(locationQuery)
    .then( address => {
        document.getElementById("city").value = address;
    });
    getWeather(locationQuery);

    $('main').css('visibility', 'visible').first().fadeIn(4000);
    $('header').css('width', '40%');
    //$('.search').css('height', '100px');
    $('.forecast-box').css('height', '100%');

    // prevent form reloading page
    e.preventDefault();
});