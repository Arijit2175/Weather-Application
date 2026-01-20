const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_name = document.querySelector('.location-name span');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000' 
    : '/api/weather'; 

async function checkWeather(city){
    const url = `${API_BASE_URL}?city=${city}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "block";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    location_name.innerHTML = `${weather_data.name}, ${weather_data.sys.country}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;

    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});