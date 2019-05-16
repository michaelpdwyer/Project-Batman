$(document).ready(function () {


    // Capture user inputs and store them into variables
    // add a date format variable that handles trip date inputs
    var userLocation = '';
    var tripDate = '';
    var dateFormat = 'MM-DD-YYYY'
    var radius = 0; //search radius, in miles, starting from user location
    var hikeLength = 0;
    var difficulty = ''; //easy/moderate/challenging


    $("#submit").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        // Capture user inputs and store them in variables
        userLocation = $("#location").val().trim();
        tripDate = $("#date").val().trim();
        radius = $("#radius").val().trim();
        hikeLength = $("#length").val().trim();
        difficulty = $("#difficulty").val().trim();

        //this moment() js code captures the "trip date" field input (which is a string), stores it in 
        //the format specified by the "dateFormat" variable and displays it in that format
        //(if we wanted, we could store it in one format and display it in another.)

        tripDate = moment(tripDate, dateFormat).format(dateFormat);

        // Console log each of the user inputs to confirm we are receiving them
        console.log(userLocation);
        console.log(tripDate);
        console.log(radius);
        console.log(hikeLength);
        console.log(difficulty);

        //call the lat/long function, which will take the user location &
        //return in latitude & longitude
        //the return variable is an object with two properties (lat & long)

        var userLatLong = latLong(userLocation);

        //now that we have the user's latitude & longitude, we can query
        //the hiking project API 

        // Constructing a URL to search the hiking project API using 
        // our given parameters
        var apiKey = '200465587-99c82a449d86e59d5af9adda84b12cbb';

        var queryURL = 'https://www.hikingproject.com/data/get-trails?lat=' + userLatLong.coordinates.latitude + '&lon='
            + userLatLong.coordinates.longitude + '&maxDistance=' + hikeLength + '&key=' + apiKey;

        // Perform AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                //clear trip div
                tripDiv.empty();

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    // Store the hike's description, difficulty, location, and length
                    var location = results[i].location;
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Location: " + location);
                    // Create an image tag for picture(s) of the hikes
                    var hikeImage = $("<img>");
                    // Giving the image tag an src attribute of a proprty from the result item
                    hikeImage.attr("src", results[i].imSmall);

                    //There's a lot more info from the API we can pull in here and append to the page
                    //We should talk about what values we want to include

                    //call the directions and weather functions to display directions and forecast

                    var directions = getDirections(userLocation, results[i].location);
                    var forecast = getWeather(tripDate);

                    var f = $("<p>").text("Forecast: " + forecast);
                    var d = $("<p>").text("Directions: " + directions);

                    // Appending the elements containing the hike info to the tripDiv
                    tripDiv.append(p);
                    tripDiv.append(f);
                    tripDiv.append(d);
                    tripDiv.append(hikeImage);

                    // Prepending the gifDiv to the "#hikeinfo" div in the HTML
                    $("#hikeinfo").prepend(hikeDiv);
                }
            });


        // push data to our db
        database.ref().push({
            userLocation: userLocation,
            userLatLong: userLatLong,
            tripDate: tripDate,
            radius: radius,
            hikeLength: hikeLength,
            difficulty: difficulty,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });




});