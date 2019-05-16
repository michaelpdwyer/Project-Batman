$(document).ready(function () {


    var radius = 100;

    geocode();

    $("#submit").on("click", function (event) {
        // Prevent actual submit
        // event.preventDefault();
        var location = 'Seattle, WA';
        //axios call
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyA_xzfPh18rbIi49vR0OfQ1z7J3TOuAw8Y'
            }
        })
            .then(function (response) {
                // Get lat and lng
                var lat = response.data.results[0].geometry.location.lat;
                var lng = response.data.results[0].geometry.location.lng;

                //Hiking Project API call

                var apiKey = '200465587-99c82a449d86e59d5af9adda84b12cbb';
                var queryURL = 'https://www.hikingproject.com/data/get-trails?lat=' + lat + '&lon=' + lng + '&maxDistance=' + radius + '&key=' + apiKey;
                // Perform AJAX GET request
                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    // After the data comes back from the API
                    .then(function (response) {
                        // Storing an array of results in the results variable
                        var results = response.trails;
                        console.log(results);

                        // for (var i = 0; i < results.length; i++) {
                        //     console.log(results[i].difficulty);
                        // }

                        // Looping over every result item
                        // for (var i = 0; i < results.length; i++) {
                        //     // Store the hike's description, difficulty, location, and length
                        //     var location = results[i].location;
                        //     console.log(location);
                        //     // Creating a paragraph tag with the result item's rating
                        //     var p = $("<p>").text("Location: " + location);
                        //     // Create an image tag for picture(s) of the hikes
                        //     var hikeImage = $("<img>");
                        //     // Giving the image tag an src attribute of a proprty from the result item
                        //     hikeImage.attr("src", results[i].imSmall);

                        // }
                    });



            })

            .catch(function (error) {
                console.log(error);
            });
    });



});




