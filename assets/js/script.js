//create a 'topics' array of search queries for GIPHY API
var topics = ["cats", "dogs", "goats", "llamas"];
//get form input and add to 'topics' array
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
        a.addClass("btn btn-lg btn-info");
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

renderButtons();

//Handle events where the Add button is clicked
$("#submit-animal").on("click", function(event) {
  event.preventDefault();
  var topic = $("#add-animal").val().trim();
  topics.push(topic);
  renderButtons();
  $("input").val("");
});

//when a button is clicked, trigger AJAX call to GIPHY API based on search query from button's data value, return 10 gifs

// $("button").click(function(){
// 	$(this).attr("aria-selected", "true");

// 	//display 10 gifs in carousel with rating as caption
// 	//set gifs so they display as still and animate on click (and vice versa)

// 	});