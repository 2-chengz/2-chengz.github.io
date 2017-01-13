'use strict'

$(document).ready(function(){
  var muscleGroups = ['Back', 'Chest', 'Leg', 'Core', 'Arm', 'Shoulder', 'Full Body']
  var muscleGroupsNav = ['Back', 'Chest', 'Leg', 'Core', 'Arm', 'Shoulder', 'Full Body', 'FullBody']
  var workoutTypes = ['Increase Strength', 'Increase Size', 'Test One Rep Max', 'Return to Muscle Group Selector']
  var IncreaseStrength = {
    rep: [1,2,4],
    sets: [1,2,4],
    weight: [1,2,4]
  }
  var IncreaseSize = {
    rep: [1,2,4],
    sets: [1,2,4],
    weight: [1,2,4]
  }
  var TestOneRepMax = {
    rep: [1,2,4],
    sets: [1,2,4],
    weight: [1,2,4]
  }

  var chest = {
    benchPress: {}
  }

  /*
  muscle group -> workouts
  routine -> rep/set/scheme

  match a muscle group with a routine



  */
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
      $('.instruction').empty();
      $('.instruction').text('What kind of '+response.toLowerCase()+' workout are you looking for?');
      if (response === 'Fullbody'){
        $('.instruction').empty();
        $('.instruction').text('What kind of full body workout are you looking for?');
      }
      // console.log('should have added workout type list')
    }
    $('.list-group').attr('id', response)
  }

  function workoutTypeSelection(response){
    console.log(response);
    var muscle = $('.list-group').attr('id')
    if (muscle === 'Back'){
      console.log(muscle+' + '+response+' workout!')
      workoutSelected(muscle, response)
    } else if (muscle === 'Chest'){
      console.log(muscle+' + '+response+' workout!')
    } else if (muscle === 'Leg'){
      console.log(muscle+' + '+response+' workout!')
    } else if (muscle === 'Core'){
      console.log(muscle+' + '+response+' workout!')
    } else if (muscle === 'Arm'){
      console.log(muscle+' + '+response+' workout!')
    } else if (muscle === 'Shoulder'){
      console.log(muscle+' + '+response+' workout!')
    }     else if (muscle === 'FullBody'){
      console.log(muscle+' + '+response+' workout!')
    } else {
      console.log('something went wrong in the workout selection')
    }
  }

  function workoutSelected(muscle,workoutType){
    $('[id^=detail-]').hide();
    $('.toggle').click(function() {
      $input = $( this );
      $target = $('#'+$input.attr('data-toggle'));
      $target.slideToggle();
    });
    $('.instruction').empty();
    $('.instruction').text('Here is your '+muscle.toLowerCase()+' workout for today!');
    $('.list-group').remove();
    var panelDiv = $('<div />',{
      'class': 'panel panel-default'
    });
    var listGroup = $('<ul />',{
      'class': 'list-group'
    });
    // http://bootsnipp.com/snippets/featured/expandable-panel-list
    var listGroupItem = $('<li />',{
      'class': 'list-group-item'
    });
    var toggleDiv = $('<div />', {
      'class': 'row toggle',
      'id': 'dropdown-detail-1',
      'data-toggle': 'detail-1',
    });
    var workoutList = $('<div />', {
      'class': 'col-xs-10',
      text: 'placeholder workout'
    });
    var workoutList2 = $('<div />', {
      'class': 'col-xs-2'
    });
    var workoutList3 = $('<i />', {
      'class':'fa fa-chevron-down pull-right'
    });
    var detail1 = $('<div />',{
      'id': 'detail-1'
    });
    var hr = $('<hr />',{
    });
    var containerDiv = $('<div />',{
      'class':'container'
    });
    var fluidRowDiv = $('<div />',{
      'class': 'fluid-row'
    });
    var workoutInfo = $('<div />',{
      'class': 'col-xs-5',
      text: 'placeholder workout info'
    });

    // add the element to the body
    $('.container-fluid').append(panelDiv);
    $('.panel').append(listGroup);
    $('.list-group').append(listGroupItem);
    $('.list-group-item').append(toggleDiv, detail1);
    $('#detail-1').append(hr, containerDiv)
    $('#dropdown-detail-1').append(workoutList, workoutList2);
    $('.col-xs-2').append(workoutList3)
    $('.container').append(fluidRowDiv);
    $('.fluid-row').append(workoutInfo);

    // var routine = workoutType.replace(/ /g,'')
    // console.log(routine)
    // routine.sets(1)
    }

  (function muscleGroupListener(){
    $('.list-group').on('click', 'a', function(response){
      event.preventDefault();
      // console.log(response)

      if ($.inArray(response.currentTarget.id, muscleGroupsNav) !== -1 ){
        muscleGroupSelection(response.currentTarget.id);
        // console.log('found a match in array to navigate to a musclegroup');

      } else if (response.currentTarget.id === 'backToMain') {
        $('.list-group-item').remove()
        for (var i = 0; i < muscleGroups.length; i++){
          $('.list-group').append('<a id='+muscleGroups[i].replace(/ /g,'')+' class=list-group-item>'+muscleGroups[i]+'</a>');
        }
        $('.list-group').attr('id', '');
        $('.instruction').empty();
        $('.instruction').text('What muscle group do you want to work out today?');

      } else if ($.inArray(response.currentTarget.textContent, workoutTypes) !== -1){
        workoutTypeSelection(response.currentTarget.textContent);
        // console.log('workout selection successful')
      } else {
        console.log('Something went wrong during the workout selection process')
      }

    });
  })();
});
