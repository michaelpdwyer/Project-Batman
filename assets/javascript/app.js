$(document).ready(function () {
    // Capture user inputs and store them into variables
    var userLocation = '';
    var radius = 0; //search radius, in miles, starting from user location
    var difficulty = ''; //easy/moderate/challenging
    var hikeInfo = $("<div>");

    //on click function for user search
    $("#submit").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();
        //empty the div we will be appending to
        $("#tripDiv").empty();

        // Capture user inputs and store them in variables
        userLocation = $("#userLocation").val().trim();
        tripDate = $("#tripDate").val().trim();
        radius = $("#radius").val().trim();
        difficulty = $("#difficulty").val().trim();

        //variable to create a map for each difficulty input to the API color values
        //this allows us to convert the six Hiker API difficulty tiers to our three tier difficulty input
        var listDifficulty = {
            'Green (Easy)': [
                'green',
                'greenBlue'
            ],
            'Medium': [
                'blue',
                'blueBlack'
            ],
            'Hard': [
                'black',
                'blackBlack'
            ]
        }

        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: userLocation,
                key: 'AIzaSyA_xzfPh18rbIi49vR0OfQ1z7J3TOuAw8Y'
            }
        })
            .then(function (response) {
                // Get lat and lng
                var lat = response.data.results[0].geometry.location.lat;
                var lng = response.data.results[0].geometry.location.lng;

                //now that we have the user's latitude & longitude, we can query
                //the hiking project API 
                // Constructing a URL to search the hiking project API using our given parameters
                var apiKey = '200465587-99c82a449d86e59d5af9adda84b12cbb';

                var queryURL = 'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon='
                    + lng + '&maxDistance=' + radius + '&key=' + apiKey;

                // Perform AJAX GET request on the hiking API
                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    // After the data comes back from the API
                    .then(function (response) {
                        // Storing an array of results in the results variable
                        var results = response.trails;

                        //empty the hike info div
                        hikeInfo.empty();

                        //filter result set by difficulty
                        for (var i = 0; i < results.length; i++) {
                            // Store the hike's name & description, difficulty, location, and length
                            if (results[i].difficulty === listDifficulty[difficulty][0] || results[i].difficulty === listDifficulty[difficulty][1]
                            ) {
                                //create a div to hold the hike info & add a class (which we can use for formatting)
                                var hikeDiv = $("<div>");
                                hikeDiv.addClass("info");

                                //assign API data to html elements
                                var name = results[i].name;
                                var nameDisplay = $("<p class='resultText'>").html("<strong>Hike name: </strong>" + name);
                                var location = results[i].location;
                                var locDisplay = $("<p class='resultText'>").html("<strong>Location:</strong> " + location);
                                var summary = results[i].summary;
                                var sumDisplay = $("<p class='resultText'>").html("<strong>Summary:</strong> " + summary);
                                var diffDisplay = $("<p class='resultText'>").html("<strong>Difficulty:</strong> " + difficulty);
                                var length = results[i].length;
                                var lengthDisplay = $("<p class='resultText'>").html("<strong>Length in Miles:</strong> " + length);
                                var elevationGain = results[i].ascent;
                                var elevationDisplay = $("<p class='resultText'>").html("<strong>Elevation Gain:</strong> " + elevationGain + " ft");
                                var highestPoint = results[i].high;
                                var highestPointDisplay = $("<p class='resultText'>").html("<strong>Highest Point:</strong> " + highestPoint + " ft");

                                //set latitude and longitude values for the hike location to variables
                                var hikeLat = String(results[i].latitude);
                                var hikeLng = String(results[i].longitude);
                                //combine the lat and long variables, separated by a comma
                                var hikeLocation = hikeLat + ',' + hikeLng;

                                //create URL that accepts the userLocation and the hike location (in latitude/longitude)
                                //we will use this to get Google Maps directions
                                var mapsURL = "https://www.google.com/maps/dir/" + userLocation + "/" + hikeLocation;
                                encodeURI(mapsURL);
                                //create a form that will allow the user to click a button & get directions
                                var uniqueForm = $("<form id='directionsForm'>");
                                uniqueForm.attr("action", mapsURL);
                                //create button
                                var uniqueButton = $("<input id='directionsButton'>");
                                uniqueButton.attr("type", "submit");
                                uniqueButton.val("Get Directions");
                                //append button to form
                                uniqueForm.append(uniqueButton);

                                //Create an image tag for picture(s) of the hikes
                                var hikeImage = $("<img>");
                                // Give the image tag a src attribute of the image property from the result item
                                hikeImage.attr("src", results[i].imgSmallMed);

                                //add image class to the hike image
                                hikeImage.addClass("resultImage");
                                // Appending the elements containing the hike info to the hikeDiv
                                hikeDiv.append(hikeImage, nameDisplay, locDisplay, sumDisplay, diffDisplay, lengthDisplay, elevationDisplay,
                                    highestPointDisplay, uniqueForm);

                                //append hike div to hike info div
                                hikeInfo.append(hikeDiv);
                            }
                        }

                    }) // Prepending the hike info div to the "#tripDiv" div in the HTML
                $("#tripDiv").append(hikeInfo);

            });
    });

});


