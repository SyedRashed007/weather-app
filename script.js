const apikey = "ef0f9306883aa2ee119e64f8b6a68353";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city),{
        origin: "cors"});
        const respData = await resp.json();

        console.log(respData);

        addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KToC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
    <div class="temp">${temp}<span>°C</span></div>


    <div class="city">${search.value}, ${data.sys.country}</div>


    <div class="wind">${data.weather[0].main}<img class="img" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></div>
    `;

    main.innerHTML = "";

    main.appendChild(weather);    
}

function KToC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});


