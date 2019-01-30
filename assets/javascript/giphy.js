$(document).ready(function() {

    var peanuts = [
      "Snoopy", "Schroeder", "Charlie Brown Christmas Tree", 
      "Peppermint Patty", "Violet Gray", "Rerun van Pelt", "Pig-Pen"
    ];




    function genBTN(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();
    
        for (var i = 0; i < arrayToUse.length; i++) {
          var a = $("<button>");
         
          a.attr("data-type", arrayToUse[i]);
          a.addClass(classToAdd);
          a.text(arrayToUse[i]);
          $(areaToAddTo).append(a);
        }
    
      }
    
      $(document).on("click", ".btn", function() {
        $("#peanuts").empty();
        $(".btn").removeClass("active");
        $(this).addClass("active");
    
        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
              var peanutsDiv = $("<div class=\"peanuts-character\">");
    
              var rating = results[i].rating;
    
              var p = $("<p>").text("Rating: " + rating);
    
              
              var still = results[i].images.fixed_height_still.url;
              var animated = results[i].images.fixed_height.url;
        
    
              var peanutsIMG = $("<img>");
              peanutsIMG.attr("src", still);
              peanutsIMG.attr("data-still", still);
              peanutsIMG.attr("data-animate", animated);
              peanutsIMG.attr("data-state", "still");
              peanutsIMG.addClass("peanuts-IMG");
    
              peanutsDiv.append(p);
              peanutsDiv.append(peanutsIMG);
    
              $("#peanuts").append(peanutsDiv);
            }
          });
      });
    
      $(document).on("click", ".peanuts-IMG", function() {
    
        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
      $("#add").on("click", function(event) {
        event.preventDefault();
        var addPeanuts = $("input").eq(0).val();
    
        if (addPeanuts.length > 2) {
          peanuts.push(addPeanuts);
        }
    
        genBTN(peanuts, "btn", "#btns");
    
      });
    
      genBTN(peanuts, "btn", "#btns");
    });
    