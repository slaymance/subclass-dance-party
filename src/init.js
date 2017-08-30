$(document).ready(function() {
  window.dancers = [];
  var $linedUp = false;
  var $selected = false;

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */

    const classesMapping = {
      'BlinkyDancer': BlinkyDancer,
      'GrowingDancer': GrowingDancer,
      'ColorDancer': ColorDancer
    };

    let dancerMakerFunctionName = $(this).data('dancer-maker-function-name');
    // get the maker function for the kind of dancer we're supposed to make
    let dancerMakerFunction = classesMapping[dancerMakerFunctionName];
    // make a dancer with a random position

    let dancer = new dancerMakerFunction(
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node.data('index', window.dancers.length));
    window.dancers.push(dancer);
  });

  $('.lineUp').on('click', function(event) {
    event.preventDefault();
    $linedUp = !$linedUp;
    var $dancers = $('span.dancer');

    if ($linedUp) {
      $(this).text('original positions');
    } else {
      $(this).text('make dancers line up');
    }

    $dancers.each(function(index) {
      if ($linedUp) {
        $(this).css({
          top: '500px',
          left: index / window.dancers.length * 100 + '%',
        });
      } else {
        $(this).css({
          top: window.dancers[index].top,
          left: window.dancers[index].left
        });
      }
    });
  });

  $('body').on('click', '.dancer', function(event) {
    event.preventDefault();
    $selected = !$selected;
    var $dancers = $('span.dancer');
    var selectedDancer = window.dancers[$(this).data('index')];

    var shortestDistance;
    let nearestDancer;
    
    for (var i = 0; i < window.dancers.length; i++) {
      var distance = Math.pow(Math.pow((selectedDancer.top - window.dancers[i].top), 2) + Math.pow((selectedDancer.left - window.dancers[i].left), 2), 0.5);

      if (!shortestDistance || distance < shortestDistance && distance > 0) {
        nearestDancer = window.dancers[i];
        shortestDistance = distance;
      }
    }

    clearTimeout(selectedDancer);
    clearTimeout(nearestDancer);
    selectedDancer.$node.animate({top: nearestDancer.top, left: nearestDancer.left}, {duration: 'slow', complete: function() {
      clearTimeout(selectedDancer);
      clearTimeout(nearestDancer);
      selectedDancer.$node.animate({top: selectedDancer.top, left: selectedDancer.left}, 'slow');
    }});
    clearTimeout(selectedDancer);
    clearTimeout(nearestDancer);
    nearestDancer.$node.animate({top: selectedDancer.top, left: selectedDancer.left}, {duration: 'slow', complete: function() {
      clearTimeout(selectedDancer);
      clearTimeout(nearestDancer);
      nearestDancer.$node.animate({top: nearestDancer.top, left: nearestDancer.left}, 'slow');
    }});
  });
});
