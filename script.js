$(document).ready(function(){

  var isDropdownOpen = false
  var previousMarginLeft = ""
  $(".link").find($(".linkline")).css('visibility', 'hidden')
  $("#hiddena").css('visibility', 'hidden')
  $(".linkline").css("width", 0)
  $(".linkline").find($("rect")).css("width", 0)

  $(window).on( "resize", function() {
    if($(window).width() <= 850) {
      if(isDropdownOpen == false) {
        $(".sidebar").css("margin-left", "-50%")
      }
      previousMarginLeft = "-50%"
    } else {
      if(isDropdownOpen == false) {
        $(".sidebar").css("margin-left", "-11em")
      }
      previousMarginLeft = "-11em"
    }
  });

  $.fn.textWidth = function(){
    var html_org = $(this).html();
    var html_calc = '<span>' + html_org + '</span>';
    $("#hiddena").html(html_calc);
    var width = $("#hiddena").find('span:first').width();
    return width;
  };

  $(".link").hover(function(){
    $(this).find($("a")).css("color", "#FF715B")
    $(this).find($(".linkline")).css('visibility', 'visible')
    $(this).find($(".linkline")).css("width", $(".link").find($("a")).textWidth())
    $(this).find($(".linkline")).find($("rect")).css("width", $(".link").find($("a")).textWidth())
  }, function () {
    $(this).find($(".linkline")).css("width", 0)
    $(this).find($(".linkline")).find($("rect")).css("width", 0)
    $(this).find($(".linkline")).css('visibility', 'hidden')
    $(this).find($("a")).css("color", "#BCED09")
  });

  $(".link").click(function(){
  }, function () {
    if($(this).text().includes("Project")) {
      $(".maincontent").load("project.html");
    }
    if($(this).text().includes("Project")) {
      $(".maincontent").load("about.html");
    }
    if($(this).text().includes("Links")) {
      $(".maincontent").load("links.html");
    }
    $(".link").find($(".linkline")).css('visibility', 'hidden')
  });

  $(".dropdown").click(function(){

  }, function () {
    if(isDropdownOpen == false) {
      sidebarResetWidth = $(".sidebar").css("margin-left");
      isDropdownOpen = true;
      $(".line").css("color", "#F9CB40")
      $("#line1").css("transform", "rotate(135deg)")
      $("#line1").css("top", "45%")
      $("#line3").css("transform", "rotate(-135deg)")
      $("#line3").css("top", "45%")
      $("#line2").hide()
      previousMarginLeft = $(".sidebar").css("margin-left")
      $(".sidebar").css("margin-left", "0em")
    } else {
      isDropdownOpen = false;
      $(".line").css("color", "#F9CB40")
      $("#line1").css("transform", "revert")
      $("#line1").css("top", "25%")
      $("#line3").css("transform", "revert")
      $("#line3").css("top", "65%")
      $("#line2").show()
      $(".sidebar").css("margin-left", previousMarginLeft)
    };
  });

  $(".dropdown").hover(function(){
    if(isDropdownOpen == false) {
      $(".line").css("color", "#bced09")
    } else {
      $(".line").css("color", "#ff715b")
    }
  }, function () {
    if(isDropdownOpen == false) {
      $(".line").css("color", "#F9CB40")
    } else {
      $(".line").css("color", "#F9CB40")
    }
  });

});
