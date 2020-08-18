var inputValue = document.querySelector(".inputValue");

var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");


var previousSearch = JSON.parse(localStorage.getItem("searchHistory")) || []
displaySearchHistory()           
$("#button").on("click", function (event) {
    event.preventDefault()
    let city = $(".inputValue").val()
    console.log(city)
    currentForecast(city)
    fiveDayForecast(city)
})


function currentForecast(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=92e5d14a488e2a2aa9d17382dded5f86&units=imperial",
        type: "GET"
        })
        .then(function (apiResponse){
            console.log(apiResponse)
            $("#currentForecast").html(`
            <h2>${apiResponse.name}</h2>
            <img src="https://openweathermap.org/img/wn/${apiResponse.weather[0].icon}.png" />
            <p>Temperature: ${apiResponse.main.temp}</p>
            <p>Humidity: ${apiResponse.main.humidity}</p>
            <p>It Is Currently: ${apiResponse.weather[0].description}</p>
            <p>Wind Speed: ${apiResponse.wind.speed}</p>`)
            previousSearch.push(city)
            localStorage.setItem("searchHistory", JSON.stringify(previousSearch)) 
            displaySearchHistory()           
        })}
        
function fiveDayForecast(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2c6356638316e418322dd5160cce5cd2&units=imperial",
        type: "GET"
        })
        .then(function (apiResponse){
            console.log(apiResponse)
            for (i=0; i<apiResponse.list.length; i=i+8){
            $("#fiveDayForecast").append(`<div class="card">
            <p>It Is Currently: ${apiResponse.list[i].weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${apiResponse.list[i].weather[0].icon}.png" />
            <p>Temperature: ${apiResponse.list[i].main.temp}</p>
            <p>Humidity: ${apiResponse.list[i].main.humidity}</p>
            <p>Wind Speed: ${apiResponse.list[i].wind.speed}</p></div>`)

            }                        
        })
}

function displaySearchHistory () {
    var HTMLstring = ""
    for (i=0; i<previousSearch.length; i++){
        HTMLstring += `<button class="seach" >${previousSearch[i]}</button>`
    }
    $("#previousSearches").html(HTMLstring)
}