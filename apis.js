// Import Access Keys
import { accessKey, secret_key } from './apikeys.js';

// Positionstack API
// Forward Geocoding for location search box
const access_key = accessKey;
const url = 'https://cors-anywhere.herokuapp.com/http://api.positionstack.com/v1/forward?';


const geocode = async (locationQuery) => {
    // create endpoint url for location search
    const endpoint = `${url}access_key=${access_key}&query=${locationQuery}`;

    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);

            // Picking first location object (data[0]) as most likely result
            const lat = jsonResponse.data[0].latitude;
            console.log(`Latitude: ${lat}`);

            const long = jsonResponse.data[0].longitude;
            console.log(`Longitude: ${long}`);

            const coords =  `/${lat},${long}`;
            console.log(`Lat and Long: ${coords}`);
            return coords;

        }

    } catch(error) {
        console.log('Geocode Error');
    }
};


//Fetch Address for Search Confirmation

const getAddress = async (locationQuery) => {
    // create endpoint url for location search
    const endpoint = `${url}access_key=${access_key}&query=${locationQuery}`;

    try {
        const response = await fetch(endpoint);

        if (response.ok) {
            const jsonResponse = await response.json();

            // Retrieve + Return adrress label
            const address = jsonResponse.data[0].label;

            return address;
        }

    } catch(error) {
        console.log('Searchbox Error');
    }

};



// DarkSky API

const secretKey = secret_key;
const urlDarkSky = 'https://api.darksky.net/forecast/';
// CORS server for testing
const corsUrl = 'https://cors-anywhere.herokuapp.com/';

const getWeatherData = async (coords) => {
    // CHECK UNITS!
    const endpoint = `${corsUrl}${urlDarkSky}${secretKey}${coords}?units=uk2`;
    console.log(endpoint);

    try {
        const response = await fetch(endpoint);

        if (response.ok) {

            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const weatherNow = jsonResponse.currently;
            console.log(weatherNow);
            return jsonResponse;

        }

    } catch(error) {
        console.log(`DarkSky Error... ${error}`);
    }
};



export { geocode, getAddress, getWeatherData };
