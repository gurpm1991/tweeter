$(document).ready(function() {

  let count = 140;

  $("textarea").keyup(function() {
    var tweetCount = count - Number(this.value.length);

    var color = (tweetCount > 0) ? "black" : "red"

      $(this).siblings(".counter")
        .text(tweetCount)
        .css("color", color);
    
  });

});