// Initial array of movies
var movies = ["Borat", "Matrix", "Titanic", "Cat"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(queryURL);

          console.log(response);
          $("#movies-view").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click


           // storing the data from the AJAX request in the results variable
           var results = response.data;
          console.log(results);

           if (results == ""){
            alert("There isn't a gif for this selected button");
          }
           // Looping through each result item
           for (var i = 0; i < results.length; i++) {


          // Creating a div to hold the movie
          var movieDiv = $("<div class='movie'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element with h2 tag to have the rating displayed
          var p = $("<h2>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var topicImage = $("<img>");

          // Setting the src attribute of the image to a property pulled off the result item
          // topicImage.attr("src", results[i].images.fixed_height.url);



          // Appending the paragraph and image tag to the animalDiv
          movieDiv.append(p);
          movieDiv.append(topicImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#movies-view").prepend(movieDiv);

          // Creating an element to hold the image
          var image = $("<img>");
          var staticSrc = results[i].images.fixed_height_still.url;
          image.attr("src", staticSrc);
          image.attr("data-still",results[i].images.fixed_height_still.url); // still image
          image.attr("data-animate",results[i].images.fixed_height.url); // animated image
          image.attr("data-state", "still"); // set the image animate
          image.addClass("image");

          // Appending the image
          movieDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);
        };
      })

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("movie");
          // Adding a data-attribute
          a.attr("data-name", movies[i]);
          // Providing the initial button text
          a.text(movies[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // $("image").on("click", function() {
      //       // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      //       var state = $(this).attr("data-state");
      //       // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      //       // Then, set the image's data-state to animate
      //       // Else set src to the data-still value
      //       if (state === "still") {
      //         $(this).attr("src", $(this).attr("data-animate"));
      //         $(this).attr("data-state", "animate");
      //       } else {
      //         $(this).attr("src", $(this).attr("data-still"));
      //         $(this).attr("data-state", "still");
      //       }
      //     });
      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);
      
    // Document Event Listeners


    $(document).on('mouseover', ".image", function(){
       var state = $(this).attr('data-state');
    if ( state == 'animate'){
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }else{
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }
    });


      // Calling the renderButtons function to display the intial buttons
      renderButtons();