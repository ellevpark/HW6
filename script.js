$(document).ready(function(){
    // create a search bar that will take city that user inputs 
    $('#submitWeather').click(function(){
        var city = $('#city').val(); 
        if (city != ""){
             console.log (city);
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperic" + "&APPID=93a011811ca9f461f8bf87ca0588f418", 
                method: "GET",
                }
            )
        // append city name 
        .then(function(response) {  
            $('#testCity').append(response.name);
            console.log (response)
        // show current date that user pulled data
        // display Temperature, Humidity, Wind Speed, and UV Index 
        // Have a 5-Day Forecast showing date, current weather status, Temperature, and Humidity
        // Have a list of cities that generates based upon user search engine 
    
          });
        };
    });
    });
    