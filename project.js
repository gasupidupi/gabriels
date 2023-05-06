$.getIntersectionOfInfiniteSlopeLineAndOtherLine = function(infinite_slope_line, other_line) {
  // Make sure the infinite_slope_line has an infinite slope
  if (infinite_slope_line[0][0] !== infinite_slope_line[1][0]) {
    throw "Line does not have an infinite slope!";
  }
  var x = infinite_slope_line[0][0];
  var m = (other_line[1][1] - other_line[0][1]) / (other_line[1][0] - other_line[0][0]); // slope
  var b = other_line[0][1] - m * other_line[0][0]; // y-intersect
  var y = m * x + b; // slope-intercept form
  return [x, y];
};

$.isInBoundsOfInfiniteSlopeLine = function(line, point) {
  // Make sure the line has an infinite slope
  if (line[0][0] !== line[1][0]) {
    throw "Line does not have an infinite slope!";
  }
  // Check if the point is within the bounds of the line
  return (point[1] >= Math.min(line[0][1], line[1][1])) && (point[1] <= Math.max(line[0][1], line[1][1]));
};


$.showLine = function(line, is_dotted) {
  // Create a new SVG line element using endpoint data from the nested array
  var svgLine = $('<line/>').attr({
    'x1': line[0][0] - Math.min(line[0][0], line[1][0]) + 1,
    'y1': line[0][1] - Math.min(line[0][1], line[1][1]) + 1,
    'x2': line[1][0] - Math.min(line[0][0], line[1][0]) + 1,
    'y2': line[1][1] - Math.min(line[0][1], line[1][1]) + 1,
    'stroke': 'black',
    'stroke-width': 2,
    'stroke-dasharray': is_dotted ? '5 5' : 'none'
  })

  // Create a new SVG parent element with width and height to accommodate the child line element
  var svgContainer = $('<svg/>').attr({
    'width': Math.abs(line[0][0] - line[1][0]) + 2 + 'px',
    'height': Math.abs(line[0][1] - line[1][1]) + 2 + 'px',
    'style': 'position: absolute; top: ' + (Math.min(line[0][1], line[1][1]) - 1) + 'px; left: ' + (Math.min(line[0][0], line[1][0]) - 1) + 'px;'
  }).append(svgLine).addClass('line');

  // Append the SVG container to the target DIV element with an ID of "droppable"
  $('#droppable').append(svgContainer);


}

$.showPhantom = function(position) {
  // Create a new SVG line element using endpoint data from the nested array
  var svgPhantom = $('<circle/>').attr({
    'r': 3,
    'cx': '3px',
    'cy': '3px'
  })

  // Create a new SVG parent element with width and height to accommodate the child line element
  var svgContainer = $('<svg/>').attr({
    'id': 'phantom',
    'width': 6 + 'px',
    'height': 6 + 'px',
    'style': 'position: absolute; top: ' + position[1] + 'px; left: ' + position[0] + 'px;'
  }).append(svgPhantom);

  // Append the SVG container to the target DIV element with an ID of "droppable"
  $('#droppable').append(svgContainer);

}


$(document).ready(function() {

  $('.draggable').draggable()

  $('#droppable').droppable({
    drop: function(event, ui) {
      // every position (pos) is a list where [0] is the x position and [1] is the y position
      // every line is a list with two endpoint position
      var thing_pos = [$('#thing').position().left + 3, $('#thing').position().top + 3] // thing center
      var mirror_line = [
        [$('#mirror').position().left, $('#mirror').position().top],
        [$('#mirror').position().left, $('#mirror').position().top + 500]
      ] // mirror surface
      var eye_line = [
        [$('#eye').position().left + 90, $('#eye').position().top + 6],
        [$('#eye').position().left + 90, $('#eye').position().top + 94]
      ] // inner eye surface
      var phantom_pos = [2 * mirror_line[0][0] - thing_pos[0], thing_pos[1]] // phantom center
      var thing_mirror_line = [thing_pos, [mirror_line[0][0], thing_pos[1]]]
      var mirror_phantom_line = [thing_mirror_line[1], phantom_pos]
      var phantom_mirror_line_a = [
        phantom_pos,
        $.getIntersectionOfInfiniteSlopeLineAndOtherLine(
          mirror_line,
          [phantom_pos, eye_line[0]]
        )
      ] // line from phantom to intersection between phantom to top eye and mirror
      var phantom_mirror_line_b = [
        phantom_pos,
        $.getIntersectionOfInfiniteSlopeLineAndOtherLine(
          mirror_line,
          [phantom_pos, eye_line[1]]
        )
      ] // line from phantom to intersection between phantom to bot eye and mirror
      var mirror_eye_line_a = [phantom_mirror_line_a[1], eye_line[0]]
      var mirror_eye_line_b = [phantom_mirror_line_b[1], eye_line[1]]
      var mirror_thing_line_a = [phantom_mirror_line_a[1], thing_pos]
      var mirror_thing_line_b = [phantom_mirror_line_b[1], thing_pos]



      $('.line').remove();
      $('#phantom').remove();
      if (
        $.isInBoundsOfInfiniteSlopeLine(mirror_line, phantom_mirror_line_a[1]) &&
        $.isInBoundsOfInfiniteSlopeLine(mirror_line, phantom_mirror_line_b[1]) &&
        eye_line[0][0] < mirror_line[0][0]
      ) {
        $.showLine(thing_mirror_line, false);
        $.showLine(mirror_phantom_line, true);
        $.showLine(phantom_mirror_line_a, true);
        $.showLine(phantom_mirror_line_b, true);
        $.showLine(mirror_eye_line_a, false);
        $.showLine(mirror_eye_line_b, false);
        $.showLine(mirror_thing_line_a, false);
        $.showLine(mirror_thing_line_b, false);
        $.showPhantom([phantom_pos[0] - 3, phantom_pos[1] - 3])
      }

      $('#droppable')[0].innerHTML = $('#droppable')[0].innerHTML;

      // Add the draggable objects back to the container
      $('.draggable').each(function() {
        var draggableObj = $(this);
        var draggablePos = draggableObj.position();
        draggableObj.css({
          'position': 'absolute',
          'left': draggablePos.left,
          'top': draggablePos.top
        }).appendTo('#droppable');
      });

      // Reapply the JQuery UI draggable behavior to the draggable objects
      $('.draggable').draggable({
        containment: '#droppable'
      });

    }
  })
});
