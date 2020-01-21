$(document).ready(function(){

var searchedCities = ["London", "Barcelona", "Paris", "Tokyo", "Seoul", "Sydney", "California", "New York"];
// create a search bar that will take city that user inputs 
//TODO:  get item JSON.stringify JSON.parse
//TODO: localstorage.setItemJSON.stringify("searchedCities", "city")

function makeButtons(){
$("#citysearch").empty();
for(var i = 0; i < searchedCities.length; i++){
    var prevCity = $("<li>").append(searchedCities[i]).addClass("searchedCity list-group-item")
    $("#citysearch").append(prevCity)
}
}

makeButtons();



$('#button-addon2').click(function(){
    var city = $('#citySearch').val(); 
    if (city){
        search(city)
    };
});

$(document).on("click", ".searchedCity", function(){
var cityInput = $(this).text()
search(cityInput);
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
        var humidity= response.main.humidity
        var temp = $("<p>").text("Temperature: " + response.main.temp + "˚F");
        humidity= $("<p>").text("Humidity: " + humidity);
        var speed = $("<p>").text("Speed: " + response.wind.speed + " MPH");
        $("#currentCity").append(temp, humidity, speed); 

    // Have a 5-Day Forecast showing date, current weather status, Temperature, and Humidity
    var lon = response.coord.lon;
    var lat = response.coord.lat;

$.ajax({
    url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&cnt={5}" + "&APPID=93a011811ca9f461f8bf87ca0588f418",
    method: "GET", 
 })

 .then(function(response){
    console.log(response)
    var uv= $("<p>").text("UV Index: " + response.value).addClass("card-text");
    $("#currentCity").append(uv);

 })

 
$.ajax({
    url: "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&APPID=93a011811ca9f461f8bf87ca0588f418", 
    method: "GET",
    })

    .then(function(response){

    $(".card-group").empty();    
        console.log(response)
    var indexToCheck = [6, 14, 22, 30, 38];
    for(var i = 0; i < indexToCheck.length; i++){
        
    var fiveDay = response.list[indexToCheck[i]];
    console.log (fiveDay)
    var fiveTemp = $("<p>").append("Temperature: " + fiveDay.main.temp + "˚F").addClass("card-text");
    var fiveHumidity = $("<p>").append("Humidity: " + fiveDay.main.humidity + "%").addClass("card-text");
    // $("#fiveDay").append(temp, humidity); 
    var date = moment(fiveDay.dt_txt)
    console.log(date.format('MMMM Do YYYY, h:mm'))
    var fiveDate = $("<h5>").addClass("card-title").append(date.format('MMMM Do YYYY'))

    var cardBody = $("<div>").addClass("card-body");
    var card = $("<div>").addClass("card text-white bg-primary mb-3");
    cardBody.append(fiveDate, fiveTemp, fiveHumidity);
    card.append(cardBody);
    $(".card-group").append(card, "<div/>")

        }
    });
    });
    }
});