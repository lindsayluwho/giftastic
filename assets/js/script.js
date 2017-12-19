//create a 'topics' array of search queries for GIPHY API
var topics = ["cats", "dogs", "goats", "llamas"];
//get form input and add to 'topics' array

function displayGifs() {
    $("#gifs-display-here").empty();
    $("#topic").attr("aria-selected", "true");
    console.log($(this).attr("data-name"));
    var animal = $(this).attr("data-name");
    console.log(animal);


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var giphyArray = response.data;
        console.log(queryURL);

        //set up carousel divs, controls, etc.
        $("#gifs-display-here").append("<div id='myCarousel' class='carousel slide' data-ride='carousel'>");
        $("#myCarousel").append("<ol class='carousel-indicators'></ol>");
        $("#myCarousel").append("<div class='carousel-inner'>")

        //display 10 gifs in carousel with rating as caption

        for (j = 0; j < giphyArray.length; j++) {
            $(".carousel-inner").append("<div class='item' id='" + j + "'>");

            var dataAnimate = giphyArray[j].images.fixed_height.url;
            var dataStill = giphyArray[j].images.fixed_height_still.url;
            var dataState = "still";
            var image = $("<img>");
            var caption = giphyArray[j].rating;

            image.addClass("gif");
            image.attr("data-still", dataStill);
            image.attr("data-animate", dataAnimate);
            image.attr("data-state", dataState);
            image.attr("src", dataStill);


            $("#" + j).append(image);
            $("#" + j).append("<div class='carousel-caption'>Rating: " + caption + "</div></div>");

            $(".carousel-indicators").append("<li data-target='#myCarousel' data-slide-to='" + j + "'></li>");

            if (j === 0) {
                $(".item").addClass("active");
                $(".carousel-indicators").addClass("active");
            }

        }

        $("#myCarousel").append("<a class='left carousel-control' href='#myCarousel' data-slide='prev'> <span class='glyphicon glyphicon-chevron-left'></span><span class='sr-only'>Previous</span></a><a class='right carousel-control' href='#myCarousel' data-slide='next'><span class='glyphicon glyphicon-chevron-right'></span><span class='sr-only'>Next</span></a>");

        //set gifs so they display as still and animate on click (and vice versa)

        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");

            if (state == "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

            renderButtons();
        });
    });
  };

    //add buttons for each index of topics array, data value should be equal to the button text which is the index of the array, display in horizontal scroll nav container

    function renderButtons() {

        // Deletes the topics prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $("#topics").empty();
        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generates buttons for each topic in the array
            var a = $("<button>");
            // Adds a class of topic to our button
            a.addClass("btn btn-lg btn-primary");
            // Added a data-attribute
            a.attr("data-name", topics[i]);
            if (i == 0) {
                a.attr("aria-selected", "true");
            }
            a.attr("id", "topic");
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the topics div
            $("#topics").append(a);
        }

    };

    //Handle events where the Add button is clicked

    $("#submit-animal").on("click", function(event) {
        event.preventDefault();
        var topic = $("#add-animal").val().trim();
        topics.push(topic);
        renderButtons();
        $("input").val("");
        console.log(topics);
    });

    //add click listener for animal buttons
    $(document).on("click", ".btn-primary", displayGifs);

    //call the renderButtons function to display the initial buttons
    renderButtons();