// Select Elements

const iconElement = document.querySelector('.weather.icon');
const tempElement = document.querySelector('.temperature.value p');
const descElement = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

//App data
const weather = {};
weather.temperature = {
    unit: 'celsius'
};

// const and variables
const KELVIN = 273;
//API
const key = '148b6df9090066f8647f3648bcdca5c8';
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.getElementsByClassName.display = 'block';
    notificationElement.innerHTML = "<p> Browser doesn't support Geolocation";
}

//set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//show error with geolocalization issue
function showError(error){
    notificationElement.getElementsByClassName.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message}`;
}

//get the API
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
    .then(function(response){
        let data = response.json();    
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN)
        weather.description = data.weather[0].description;
        weather.iconID = data.weather[0].icon;
        weather.city = data .name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

//Display weather
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}