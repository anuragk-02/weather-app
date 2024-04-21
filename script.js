console.log("Hello there Chopper");
const img = document.querySelector("img");
const form = document.querySelector("form");
const main = document.querySelector("main");

const desc = document.querySelector(".desc");
const loc = document.querySelector(".loc");
const celsius = document.querySelector(".celsius");
const feel = document.querySelector(".feel");
const wind = document.querySelector(".wind");
const humid = document.querySelector(".humid");


const getWeather = async (city)=>{
    main.style.opacity = "0";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1d71cd7d93c549046774772d97475375`, {mode:"cors"});
    const weatherData = await response.json();
    console.log(weatherData);
    const desc = weatherData.weather[0].description;
    getPicture(desc);
    // const lat = weatherData.coord.lat;
    // const lon = weatherData.coord.lon;
    // getForcast(lat,lon);
    main.style.opacity = "1";
    updateMain(weatherData);
}

const getForcast = async (lat, lon)=>{
   const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=1d71cd7d93c549046774772d97475375`)
   const forcastData = await response.json();
//    console.log(forcastData);
}

const getPicture = async (keyword)=>{
    const response = await fetch(`https://api.unsplash.com/search/photos/?page=1&query=${keyword}&client_id=ZD7Nbpwiy2OG6jf84A8IXJSm-t4xNtehKJmvMrT9H3Q`);
    const imageData = await response.json();
    console.log(imageData);
    let random = Math.floor(Math.random()*imageData.results.length);
    const url = imageData.results[random].urls.full;
    img.src = url;
    // getIcon();
}


const updateMain = ({main, name, sys, weather, wind})=>{
   console.log({main, name, sys, weather, wind});
   desc.innerHTML = `${capitalizeFirstLetter(weather[0].description)}`;
   loc.innerHTML = `${name}, ${sys.country}`;
   celsius.innerHTML = `${Math.floor(main.temp)} &#176;C`;
   feel.innerHTML = `FEELS LIKE: ${Math.floor(main.feels_like)} &#176;C`;
   wind.innerHTML = `WIND: ${wind.speed} MPH`;
   humid.innerHTML = `HUMIDITY: ${main.humidity}%`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let city = form.elements.city.value;
    getWeather(city);
})

getWeather("Nagpur");