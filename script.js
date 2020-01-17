$(document).ready(function(){

var searchedCities = ["London", "Barcelona"];
// create a search bar that will take city that user inputs 
//TODO:  get item JSON.stringify JSON.parse
//TODO: localstorage.setItemJSON.stringify("searchedCities", "city")

function makeButtons(){
$("#cityList").empty();
for(var i = 0; i < searchedCities.length; i++){
    var prevCity = $("<p>").append(searchedCities[i]).addClass("searchedCity")
    $("#cityList").append(prevCity)
}
}

makeButtons();



$('#button').click(function(){
var city = $('#citySearch').val(); 
if (city){
    search(city)
};
});

$(document).on("click", ".searchedCity", function(){
var cityInput = $(this).text()
search(cityInput)
})

function search(city){
if(searchedCities.indexOf(city) === -1){
    searchedCities.push(city)
// set item stringify into local storage
}
makeButtons();
        console.log (city);
$.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=93a011811ca9f461f8bf87ca0588f418", 
    method: "GET",
    }
)
// append city name 
.then(function(response) {  
    $("#currentCity").empty();
    
    $('#cityName').text(response.name + " ("+ moment().subtract(10, 'days').calendar() + ")" )  

    console.log (response)
    var temp = $("<p>").text("Temperature: " + response.main.temp + "˚F");
    var humidity = $("<p>").text("Humidity: " + response.main.humidity);
    var speed = $("<p>").text("Speed: " + response.wind.speed + " MPH");
    $("#currentCity").append(temp, humidity, speed); 

// Have a 5-Day Forecast showing date, current weather status, Temperature, and Humidity



$.ajax({
    url: "api.openweathermap.org/data/2.5/forecast?" + city + "&units=imperial" + "&APPID=93a011811ca9f461f8bf87ca0588f418", 
    method: "GET",
    }
    )
    .then(function(response){

        console.log (response)
    });
    for (var i=0; i< 5; i++){
}
// Have a list of cities that generates based upon user search engine 

    });
}

console.log([].length)

});