'use strict'

$(document).ready(function(){
  var muscleGroups = ['Back', 'Chest', 'Legs', 'Core', 'Arms', 'Full Body']
  var muscleGroupsNav = ['Back', 'Chest', 'Legs', 'Core', 'Arms', 'Full Body', 'FullBody']
  var workoutTypes = ['Increase Strength', 'Increase Size', 'Test One Rep Max', 'Return to Muscle Group Selector']

  function muscleGroupSelection(response){
    $('.list-group-item').remove();
    // console.log('that should have removed the list')
    for (var i = 0; i < workoutTypes.length; i++){
      // console.log(workoutTypes[i]);

      if (i < 3) {
        $('.list-group').append('<a id='+workoutTypes[i].replace(/ /g,'')+response+' class=list-group-item>'+workoutTypes[i]+'</a>');
      } else {
        $('.list-group').append('<a id=backToMain class=list-group-item>'+workoutTypes[i]+'</a>');
      }
      // console.log('should have added workout type list')
    }
  }
  (function muscleGroupListener(){
    $('.list-group').on('click', 'a', function(response){
      event.preventDefault();

      if ($.inArray(response.currentTarget.id, muscleGroupsNav) !== -1 ){
        muscleGroupSelection(response.currentTarget.id);
        // console.log('found a match in array to navigate to a musclegroup');

      } else if (response.currentTarget.id === 'backToMain') {
        $('.list-group-item').remove()
        for (var i = 0; i < muscleGroups.length; i++){
          $('.list-group').append('<a id='+muscleGroups[i].replace(/ /g,'')+' class=list-group-item>'+muscleGroups[i]+'</a>');
        }

      } else {
        console.log('Something went wrong during the workout selection process')
      }
    });
  })();
});
