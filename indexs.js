let now = new Date();
let currentData = document.querySelector("currentData");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Suterday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let miutes = now.getMinutes();
if (miutes < 10) {
  miutes = `0${miutes}`;
}
today.innerHTML = `${day} ${hours}:${miutes}`;

function searchCity(city) {
  let apiKey = "32326959e29561c07003e2cd9a21f791";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function searchLocation(position) {
  let apiKey = "32326959e29561c07003e2cd9a21f791";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTemperature(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#change-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#fells").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
}

function typeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  searchCity(city);
}
let form = document.querySelector("#form-search");
form.addEventListener("submit", typeCity);

let currenLocatioButton = document.querySelector("#button");
currenLocatioButton.addEventListener("click", getCurrentLocation);
searchCity("Kyiv");
