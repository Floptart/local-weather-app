var temperature;
var currentTemp;

function GetWeather(longitude, latitude) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`, true);
  xhttp.onload = function (e) {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        var response = JSON.parse(xhttp.responseText);
        if(response.error){
          console.error(`OH NO! ${response.error}`);
          return;
        }
        temperature = parseInt(response.main.temp);
        currentTemp = temperature;
        document.getElementById("city-text").innerHTML += response.name;
        document.getElementById("skies-text").innerHTML += response.weather[0].main;
        document.getElementById("skies-icon").innerHTML = "<img src='" + response.weather[0].icon + "'>";
        document.getElementById("theTemp").innerHTML = temperature + "C";
        document.getElementById("humidity-text").innerHTML += response.main.humidity + "%";
      } else {
        console.error(xhttp.statusText);
      }
    }
  };
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

function TempConversion () {
  if (currentTemp === temperature) {
    currentTemp = parseInt(temperature * 1.8 + 32);
    return document.getElementById("theTemp").innerHTML = currentTemp + "F";
  }
  if (currentTemp !== temperature) {
    currentTemp = temperature;
    document.getElementById("theTemp").innerHTML = temperature + "C";
  }
}

$("#theTemp").click(function() {
  TempConversion();
});

navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    GetWeather(longitude, latitude);
});

