// api key : caf622976e9ef231e2247f3a4a655fb2

//1-selecting elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notifElement = document.querySelector(".notification");

//2-app-data
const weather ={};
weather.tempreature={
    unit : "celsius"
}

//3-app const and vars
const KELVIN = 273;
const key="caf622976e9ef231e2247f3a4a655fb2";

//4-checking if browser support geolocation
if('geolocation' in navigator){
 navigator.geolocation.getCurrentPosition(setPosition , showError);
}
else{
    notifElement.style.display = "block";
    notifElement.innerHTML ="<p> Browser dosen't support Geolocation </p>";
}

//5-set user postion function
function setPosition(position){
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;

getWeather(latitude,longitude);
}

//6-showing error if there's
function showError(error){
    notifElement.style.display = "block";
    notifElement.innerHTML =`<p> ${error.message}</p>`;
}

//7-get weather from api
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
    .then(function(response){
        let data = response.json();
        //console.log(data);
        return data;
        
    })
    .then(function(data){
        weather.tempreature.value = Math.floor((data.main.temp) - KELVIN );
        //console.log(data);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        //console.log(data);
    })
    .then(function(){
        displayWeather();
    });
}

//8-displaying weather to UI
function displayWeather(){
    //<img src="icons/unknown.png" alt="">
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.tempreature.value}°<span>C</span>`
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//9- function converst c to f and vice verse
function celToFeh(temprature){
    return (temprature * 9/5) +32;
}

tempElement.addEventListener("click", function(){

    if (weather.tempreature.unit == "undefined")
    return;

    if (weather.tempreature.unit == "celsius"){
        let fahrenheit = celToFeh(weather.tempreature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.tempreature.unit = "fehrenheit";
    }
    else{
        tempElement.innerHTML = `${weather.tempreature.value}°<span>C</span>`;
        weather.tempreature.unit = "celsius";
    }
})