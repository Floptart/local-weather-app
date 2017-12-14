var latitude;
var longitude; 
var temperature;
var currentTemp;

function GetWeather() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`, true);
  xhttp.onload = function (e) {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        var response = JSON.parse(xhttp.responseText);
        document.getElementById("city-text").innerHTML = "City: " + response.name;
        document.getElementById("skies-text").innerHTML =  "Skies: " + response.weather[0].main + " - " + response.weather[0].description;
        document.getElementById("skies-icon").innerHTML =  "<img src='" + response.weather[0].icon + "'>";
        temperature = response.main.temp;
        document.getElementById("temperature-text").innerHTML =  "Temperature: " + temperature + "C";
        document.getElementById("humidity-text").innerHTML =  "Humidity: " + response.main.humidity;
      } else {
        console.error(xhttp.statusText);
      }
    }
  };
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

function TempConversion () {
  return temperature === currentTemp ? currentTemp = temperature * 1.8 + 32 : currentTemp = temperature;
}

navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
});

window.onload = GetWeather;

currentTemp = temperature;