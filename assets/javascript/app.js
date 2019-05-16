$(document).ready(function () {
    // Capture user inputs and store them into variables
    // add a date format variable that handles trip date inputs
    var userLocation = '';
    var tripDate = '';
    var dateFormat = 'MM-DD-YYYY'
    var radius = 0; //search radius, in miles, starting from user location
    var difficulty = ''; //easy/moderate/challenging
    var hikeInfo = $("<div>");


    $("#submit").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        $("#tripDiv").empty();

        // Capture user inputs and store them in variables
        userLocation = $("#userLocation").val().trim();
        tripDate = $("#tripDate").val().trim();
        radius = $("#radius").val().trim();
        difficulty = $("#difficulty").val().trim();

        // Console log each of the user inputs to confirm we are receiving them
        console.log(userLocation);
        console.log(tripDate);
        console.log(radius);
        console.log(difficulty);

        //this moment() js code captures the "trip date" field input (which is a string), stores it in 
        //the format specified by the "dateFormat" variable and displays it in that format
        // tripDate = moment(tripDate, dateFormat).format(dateFormat);

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
                        console.log(results);
                        //empty the hike info div
                        hikeInfo.empty();

                        //filter result set by difficulty
                        if (difficulty === 'Green (Easy)') {
                            for (var i = 0; i < results.length; i++) {
                                // Store the hike's name & description, difficulty, location, and length
                                if (results[i].difficulty === 'green' || results[i].difficulty === 'greenBlue') {
                                    var name = results[i].name;
                                    var nameDisplay = $("<p>").html("<strong>Hike name: </strong>" + name);
                                    var location = results[i].location;
                                    var locDisplay = $("<p>").html("<strong>Location:</strong> " + location);
                                    var hikeDiff = results[i].difficulty;
                                    var diffDisplay = $("<p>").html("<strong>Difficulty:</strong> Easy");
                                    var length = results[i].length;
                                    var lengthDisplay = $("<p>").html("<strong>Length in Miles:</strong> " + length);
                                    var elevationGain = results[i].ascent;
                                    var elevationDisplay = $("<p>").html("<strong>Elevation Gain:</strong> " + elevationGain + " ft");
                                    var highestPoint = results[i].high;
                                    var highestPointDisplay = $("<p>").html("<strong>Highest Point:</strong> " + highestPoint + " ft");

                                    //Create an image tag for picture(s) of the hikes
                                    var hikeImage = $("<img>");
                                    // Giving the image tag an src attribute of a proprty from the result item
                                    hikeImage.attr("src", results[i].imgSmallMed);
                                    hikeImage.addClass("image");

                                    // Appending the elements containing the hike info to the tripDiv
                                    hikeInfo.append(nameDisplay, locDisplay, diffDisplay, lengthDisplay, elevationDisplay, highestPointDisplay, hikeImage);
                                }
                            }
                        } else if (difficulty = 'Medium') {
                            for (var i = 0; i < results.length; i++) {
                                // Store the hike's name & description, difficulty, location, and length
                                if (results[i].difficulty === 'blue' || results[i].difficulty === 'blueBlack') {
                                    var name = results[i].name;
                                    var nameDisplay = $("<p>").html("<strong>Hike name: </strong>" + name);
                                    var location = results[i].location;
                                    var locDisplay = $("<p>").html("<strong>Location:</strong> " + location);
                                    var hikeDiff = results[i].difficulty;
                                    var diffDisplay = $("<p>").html("<strong>Difficulty:</strong> Medium");
                                    var length = results[i].length;
                                    var lengthDisplay = $("<p>").html("<strong>Length in Miles:</strong> " + length);
                                    var elevationGain = results[i].ascent;
                                    var elevationDisplay = $("<p>").html("<strong>Elevation Gain:</strong> " + elevationGain + " ft");
                                    var highestPoint = results[i].high;
                                    var highestPointDisplay = $("<p>").html("<strong>Highest Point:</strong> " + highestPoint + " ft");

                                    //Create an image tag for picture(s) of the hikes
                                    var hikeImage = $("<img>");
                                    // Giving the image tag an src attribute of a proprty from the result item
                                    hikeImage.attr("src", results[i].imgSmallMed);
                                    hikeImage.addClass("image");

                                    // Appending the elements containing the hike info to the tripDiv
                                    hikeInfo.append(nameDisplay, locDisplay, diffDisplay, lengthDisplay, elevationDisplay, highestPointDisplay, hikeImage);
                                }
                            }

                        } else if (difficulty = 'Hard') {
                            for (var i = 0; i < results.length; i++) {
                                // Store the hike's name & description, difficulty, location, and length
                                if (results[i].difficulty === 'black' || results[i].difficulty === 'blackBlack') {
                                    var name = results[i].name;
                                    var nameDisplay = $("<p>").html("<strong>Hike name: </strong>" + name);
                                    var location = results[i].location;
                                    var locDisplay = $("<p>").html("<strong>Location:</strong> " + location);
                                    var hikeDiff = results[i].difficulty;
                                    var diffDisplay = $("<p>").html("<strong>Difficulty:</strong> Hard");
                                    var length = results[i].length;
                                    var lengthDisplay = $("<p>").html("<strong>Length in Miles:</strong> " + length);
                                    var elevationGain = results[i].ascent;
                                    var elevationDisplay = $("<p>").html("<strong>Elevation Gain:</strong> " + elevationGain + " ft");
                                    var highestPoint = results[i].high;
                                    var highestPointDisplay = $("<p>").html("<strong>Highest Point:</strong> " + highestPoint + " ft");

                                    //Create an image tag for picture(s) of the hikes
                                    var hikeImage = $("<img>");
                                    // Giving the image tag an src attribute of a proprty from the result item
                                    hikeImage.attr("src", results[i].imgSmallMed);
                                    hikeImage.addClass("image");

                                    // Appending the elements containing the hike info to the tripDiv
                                    hikeInfo.append(nameDisplay, locDisplay, diffDisplay, lengthDisplay, elevationDisplay, highestPointDisplay, hikeImage);
                                }
                            }

                        } else {
                            for (var i = 0; i < results.length; i++) {
                                // Store the hike's name & description, difficulty, location, and length
                                var name = results[i].name;
                                var nameDisplay = $("<p>").html("<strong>Hike name: </strong>" + name);
                                var location = results[i].location;
                                var locDisplay = $("<p>").html("<strong>Location:</strong> " + location);
                                var hikeDiff = results[i].difficulty;
                                var diffDisplay = $("<p>").html("<strong>Difficulty:</strong> " + hikeDiff);
                                var length = results[i].length;
                                var lengthDisplay = $("<p>").html("<strong>Length in Miles:</strong> " + length);
                                var elevationGain = results[i].ascent;
                                var elevationDisplay = $("<p>").html("<strong>Elevation Gain:</strong> " + elevationGain + " ft");
                                var highestPoint = results[i].high;
                                var highestPointDisplay = $("<p>").html("<strong>Highest Point:</strong> " + highestPoint + " ft");

                                //Create an image tag for picture(s) of the hikes
                                var hikeImage = $("<img>");
                                // Giving the image tag an src attribute of a proprty from the result item
                                hikeImage.attr("src", results[i].imgSmallMed);
                                hikeImage.addClass("image");

                                // Appending the elements containing the hike info to the tripDiv
                                hikeInfo.append(nameDisplay, locDisplay, diffDisplay, lengthDisplay, elevationDisplay, highestPointDisplay, hikeImage);
                            }

                        }
                        // Prepending the hike info div to the "#tripDiv" div in the HTML
                        $("#tripDiv").append(hikeInfo);

                    });
            });

    });

});