var isDropdownOpen = false
var isPdfOpen = false
var previousMarginLeft = ""
var prevScrollpos = 0
var mobileMarginLeft = "-50%"
var computerMarginLeft = "-11em"

$.isMobile = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() <= 850) {
        return true
    } else {
        return false
    }
};

$.initialize = function() {
  $("#pdfobject").hide()
  $(".link").find($(".linkline")).css('visibility', 'hidden')
  $(".linkline").css("width", 0)
  $(".linkline").find($("rect")).css("width", 0)
  if ($.isMobile()) {
      $("#pdfbutton").hide()
      $(".sidebar").css("width", "50%")
      $(".sidebar").css("margin-left", "-50%")
      $(".maincontent").css("margin-left", "0.5em")
      $(".maincontent").css("margin-right", "0.5em")
      $(".maincontent").css("width", "auto")
      $(".leftmarginwhendesktop").css("margin-left", "0")
      previousMarginLeft = mobileMarginLeft
  } else {
      $(".sidebar").css("margin-left", "-11em")
      previousMarginLeft = computerMarginLeft
  }
};

$.getMarginLeft = function() {
  if ($.isMobile()) {
      return mobileMarginLeft
  } else {
      return computerMarginLeft
  }
};

$.closeDropdown = function() {
  isDropdownOpen = false;
  $(".line").css("color", "#F9CB40")
  $("#line1").css("transform", "revert")
  $("#line1").css("top", "25%")
  $("#line3").css("transform", "revert")
  $("#line3").css("top", "65%")
  $("#line2").show()
  $(".sidebar").css("margin-left", $.getMarginLeft())
};

$(document).ready(function() {

    $.initialize()

    $(window).on("resize", function() {
        if ($(window).width() <= 850) {
            if (isDropdownOpen == false) {
                $(".sidebar").css("margin-left", $.getMarginLeft())
            }
        } else {
            if (isDropdownOpen == false) {
                $(".sidebar").css("margin-left", $.getMarginLeft())
            }
        }
    });

    $(window).on("scroll", function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            $(".navbar").css("position", "sticky")
            $(".navbar").css("top", "0")
        } else {
            $(".navbar").css("position", "relative")
            if (isDropdownOpen = true) {
                $.closeDropdown()
            }
        }
        prevScrollpos = currentScrollPos;
    });

    $(".link").hover(function() {
        $(this).find($("a")).css("color", "#FF715B")
        $(this).find($(".linkline")).css('visibility', 'visible')
        $(this).find($(".linkline")).css("width", $(this).find($("a")).css("width"))
        $(this).find($(".linkline")).find($("rect")).css("width", $(this).find($("a")).css("width"))
    }, function() {
        $(this).find($(".linkline")).css("width", 0)
        $(this).find($(".linkline")).find($("rect")).css("width", 0)
        $(this).find($(".linkline")).css('visibility', 'hidden')
        $(this).find($("a")).css("color", "#BCED09")
    });

    $(".link").click(function() {}, function() {
        if ($(this).text().includes("About")) {
          $('html, maincontent').animate({
              scrollTop: $("#About").offset().top - 130
          }, 500);
        }
        else if ($(this).text().includes("Project")) {
          $('html, maincontent').animate({
              scrollTop: $("#Project").offset().top - 130
          }, 500);
        }
        else if ($(this).text().includes("Links")) {
          $('html, maincontent').animate({
              scrollTop: $("#Links").offset().top - 130
          }, 500);
        }
        else if ($(this).text().includes("IPA")) {
          $('html, maincontent').animate({
              scrollTop: $("#IPA").offset().top - 130
          }, 500);
        }
        else if ($(this).text().includes("Experience")) {
          $('html, maincontent').animate({
              scrollTop: $("#Experience").offset().top - 130
          }, 500);
        }
    });

    $(".link").hover(function() {
        $(this).find($("a")).css("color", "#FF715B")
        $(this).find($(".linkline")).css('visibility', 'visible')
        $(this).find($(".linkline")).css("width", $(this).find($("a")).css("width"))
        $(this).find($(".linkline")).find($("rect")).css("width", $(this).find($("a")).css("width"))
    }, function() {
        $(this).find($(".linkline")).css("width", 0)
        $(this).find($(".linkline")).find($("rect")).css("width", 0)
        $(this).find($(".linkline")).css('visibility', 'hidden')
        $(this).find($("a")).css("color", "#BCED09")
    });

    $(".dropdown").click(function() {

    }, function() {
        if (isDropdownOpen == false) {
            sidebarResetWidth = $(".sidebar").css("margin-left");
            isDropdownOpen = true;
            $(".line").css("color", "#F9CB40")
            $("#line1").css("transform", "rotate(135deg)")
            $("#line1").css("top", "45%")
            $("#line3").css("transform", "rotate(-135deg)")
            $("#line3").css("top", "45%")
            $("#line2").hide()
            $(".sidebar").css("margin-left", "0em")
        } else {
            $.closeDropdown()
        };
    });

    $("#pdfbutton").click(function() {

    }, function() {
        if (isPdfOpen) {
            isPdfOpen = false
            $("#pdfobject").hide()
            $("#pdfbutton").html("Show PDF")
        } else {
            isPdfOpen = true
            $("#pdfobject").attr("data", "IPA.pdf")
            $("#pdfobject").show()
            $("#pdfbutton").html("Hide PDF")
        }
    });

    $(".dropdown").hover(function() {
        if (isDropdownOpen == false) {
            $(".line").css("color", "#bced09")
        } else {
            $(".line").css("color", "#ff715b")
        }
    }, function() {
        if (isDropdownOpen == false) {
            $(".line").css("color", "#F9CB40")
        } else {
            $(".line").css("color", "#F9CB40")
        }
    });

});
