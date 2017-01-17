'use strict'

var config = {
    apiKey: "AIzaSyAylnJ5hUhzeehYgwPooy2WUFfyxpVd0pI",
    authDomain: "wow-much-project.firebaseapp.com",
    databaseURL: "https://wow-much-project.firebaseio.com",
    storageBucket: "wow-much-project.appspot.com",
    messagingSenderId: "395135722939"
  };
  firebase.initializeApp(config);
var routineObject = {}
var db = firebase.database();

$(document).ready(function(){
  var muscleGroups = ['Back', 'Chest', 'Leg', 'Core', 'Arm', 'Shoulder', 'Full Body']
  var muscleGroupsNav = ['Back', 'Chest', 'Leg', 'Core', 'Arm', 'Shoulder', 'Full Body', 'FullBody']
  var workoutTypes = ['Increase Strength', 'Increase Size', 'Test One Rep Max', 'Return to Muscle Group Selector']
  var currentMuscle ='';
  var currentWorkout = '';

  $('.btn').on('click', function(){
    if ($('.oneRepAmount').val() === ''){
      alert('Please estimate your one rep max. A rough estimate is good enough!')
    }
    // console.log('button was pressed')

    const dbRefObject = db.ref().child(currentMuscle+'/Exercises');
    dbRefObject.on('value', snap => {
      // console.log(snap.val());
      routineObject = snap.val();
      // console.log(routineObject)
      // console.log(routineObject.First)
      $('#dropdown-detail-1').children('.col-xs-10').text(routineObject.First)
      $('#dropdown-detail-2').children('.col-xs-10').text(routineObject.Second)
      $('#dropdown-detail-3').children('.col-xs-10').text(routineObject.Third)
      $('#dropdown-detail-4').children('.col-xs-10').text(routineObject.Fourth)
      $('#dropdown-detail-5').children('.col-xs-10').text(routineObject.Fifth)
    });

    function setExercises(){
      $('#dropdown-detail-2').children('.col-xs-10').append(' - '+routineObject.Strength.Second.Set+' sets')
      $('#dropdown-detail-3').children('.col-xs-10').append(' - '+routineObject.Strength.Third.Set+' sets')
      $('#dropdown-detail-4').children('.col-xs-10').append(' - '+routineObject.Strength.Fourth.Set+' sets')
      $('#dropdown-detail-5').children('.col-xs-10').append(' - '+routineObject.Strength.Fifth.Set+' sets')
    }

    function populateSets(){
      $('.exercise1').html('1 set x '+routineObject.Strength.First.Warmup.Set1.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.First.Warmup.Set1.Weight))+' lbs'+' <br>')
      $('.exercise1').append('1 set x '+routineObject.Strength.First.Warmup.Set2.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.First.Warmup.Set2.Weight))+' lbs'+' <br>')
      $('.exercise1').append('1 set x '+routineObject.Strength.First.Warmup.Set3.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.First.Warmup.Set3.Weight))+' lbs'+' <br>')
      $('.exercise2').text(routineObject.Strength.Second.Set+' sets x '+routineObject.Strength.Second.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.Second.Weight))+' lbs')
      $('.exercise3').text(routineObject.Strength.Third.Set+' sets x '+routineObject.Strength.Third.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.Third.Weight))+' lbs')
      $('.exercise4').text(routineObject.Strength.Fourth.Set+' sets x '+routineObject.Strength.Fourth.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.Fourth.Weight))+' lbs')
      $('.exercise5').text(routineObject.Strength.Fifth.Set+' sets x '+routineObject.Strength.Fifth.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.Fifth.Weight))+' lbs')
      // console.log('populateSet was ran')
      // console.log(($('.oneRepAmount').val()*routineObject.Strength.Second.Weight))
      // console.log(routineObject.Strength.Second.Set)
      // console.log(routineObject.Strength.Second.Rep)
    }

    if (currentWorkout === 'Increase Strength') {
      const dbRefObject = db.ref().child(currentMuscle+'/Workouts');
      dbRefObject.on('value', snap => {
        // console.log(snap.val());
        routineObject = snap.val();
        var working = Object.keys(routineObject.Strength.First.Working).length;
        var warmup = Object.keys(routineObject.Strength.First.Warmup).length;
        $('#dropdown-detail-1').children('.col-xs-10').append(' - '+(working+warmup)+' sets')
        setExercises();
        populateSets();
        $('.exercise1').append('1 set x '+routineObject.Strength.First.Working.Set1.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.First.Working.Set1.Weight))+' lbs'+' <br>')
        $('.exercise1').append('1 set x '+routineObject.Strength.First.Working.Set2.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.First.Working.Set2.Weight))+' lbs'+' <br>')
        $('.exercise1').append('1 set x '+routineObject.Strength.First.Working.Set3.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.First.Working.Set3.Weight))+' lbs'+' <br>')
        $('.exercise1').append('1 set x '+routineObject.Strength.First.Working.Set4.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.First.Working.Set4.Weight))+' lbs'+' <br>')
        $('.exercise1').append('1 set x '+routineObject.Strength.First.Working.Set5.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Strength.First.Working.Set5.Weight))+' lbs')
      });

    } else if (currentWorkout === 'Increase Size') {
      const dbRefObject = db.ref().child(currentMuscle+'/Workouts');
      dbRefObject.on('value', snap => {
        // console.log(snap.val());
        routineObject = snap.val();
        var warmup = Object.keys(routineObject.Strength.First.Warmup).length;
        setExercises();
        populateSets();
        $('#dropdown-detail-1').children('.col-xs-10').append(' - '+(routineObject.Size.First.Working.Set+warmup)+' sets')
          $('.exercise1').append(routineObject.Size.First.Working.Set+' sets x '+routineObject.Size.First.Working.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.Size.First.Working.Weight))+' lbs')
      });

    } else if (currentWorkout === 'Test One Rep Max') {
      const dbRefObject = db.ref().child(currentMuscle+'/Workouts');
      dbRefObject.on('value', snap => {
        // console.log(snap.val());
        routineObject = snap.val();
        var working = Object.keys(routineObject.OneRep.Working).length;
        var warmup = Object.keys(routineObject.Strength.First.Warmup).length;
        $('#dropdown-detail-1').children('.col-xs-10').append(' - '+(working+warmup)+' sets')
        setExercises();
        populateSets();
        $('.exercise1').append('1 set x '+routineObject.OneRep.Working.Set1.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.OneRep.Working.Set1.Weight))+' lbs'+' <br>')
        $('.exercise1').append('1 set x '+routineObject.OneRep.Working.Set2.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.OneRep.Working.Set2.Weight))+' lbs'+' <br>')
        $('.exercise1').append('1 set x '+routineObject.OneRep.Working.Set3.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.OneRep.Working.Set3.Weight))+' lbs'+' <br>')
        $('.exercise1').append('1 set x '+routineObject.OneRep.Working.Set4.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.OneRep.Working.Set4.Weight))+' lbs'+' <br>')
        $('.exercise1').append('1 set x '+routineObject.OneRep.Working.Set5.Rep+' reps @ '+(Math.floor($('.oneRepAmount').val()*routineObject.OneRep.Working.Set5.Weight))+' lbs')
      });

    } else {
      console.log('could not get workout type from DB')
    }

  });


  $('[id^=detail-]').hide();
  (function exerciseToggle(){
    $('.toggle').click(function(response) {
      // console.log(response.currentTarget.id)
      if (response.currentTarget.id === 'dropdown-detail-1'){
        $('#detail-1').slideToggle()
        // console.log($('#video1').attr('class'))
        var videoSrc = 'https://www.youtube.com/embed/YCg1YxMt3oY?rel=0'
            //would be a API call based on muscleMuscle + how to but I can't seem to get the youtube api key working. Would return a video ID that i would add into the embed URL above
        if ($('#video1').attr('class') === 'auto'){
          $('.exerciseVideo1').empty();
        } else {
        $('.exerciseVideo1').html('<iframe id="video1" width="420" height="315" src='+videoSrc+' frameborder="0" allowfullscreen wmode="Opaque"></iframe>')
        $('#video1')[0].src += '&autoplay=1';
        $('#video1').attr('class', 'auto')
        }

        response.preventDefault();
      } else if (response.currentTarget.id === 'dropdown-detail-2'){
        $('#detail-2').slideToggle()
        var videoSrc = 'https://www.youtube.com/embed/-koP10y1qZI?rel=0'
          //would be a API call based on muscleMuscle + how to but I can't seem to get the youtube api key working. Would return a video ID that i would add into the embed URL above
        if ($('#video2').attr('class') === 'auto'){
          $('.exerciseVideo2').empty();
        } else {
        $('.exerciseVideo2').html('<iframe id="video2" width="420" height="315" src='+videoSrc+' frameborder="0" allowfullscreen wmode="Opaque"></iframe>')
        $('#video2')[0].src += '&autoplay=1';
        $('#video2').attr('class', 'auto')
        }
        response.preventDefault();
      } else if (response.currentTarget.id === 'dropdown-detail-3'){
        $('#detail-3').slideToggle()
        var videoSrc = 'https://www.youtube.com/embed/u3gQT2aMVaI?rel=0'
            //would be a API call based on muscleMuscle + how to but I can't seem to get the youtube api key working. Would return a video ID that i would add into the embed URL above
        if ($('#video3').attr('class') === 'auto'){
          $('.exerciseVideo3').empty();
        } else {
        $('.exerciseVideo3').html('<iframe id="video3" width="420" height="315" src='+videoSrc+' frameborder="0" allowfullscreen wmode="Opaque"></iframe>')
        $('#video3')[0].src += '&autoplay=1';
        $('#video3').attr('class', 'auto')
        }
        response.preventDefault();
      } else if (response.currentTarget.id === 'dropdown-detail-4'){
        $('#detail-4').slideToggle()
        var videoSrc = 'https://www.youtube.com/embed/xQNrFHEMhI4?rel=0'
            //would be a API call based on muscleMuscle + how to but I can't seem to get the youtube api key working. Would return a video ID that i would add into the embed URL above
        if ($('#video4').attr('class') === 'auto'){
          $('.exerciseVideo4').empty();
        } else {
        $('.exerciseVideo4').html('<iframe id="video4" width="420" height="315" src='+videoSrc+' frameborder="0" allowfullscreen wmode="Opaque"></iframe>')
        $('#video4')[0].src += '&autoplay=1';
        $('#video4').attr('class', 'auto')
        }
        response.preventDefault();
      } else if (response.currentTarget.id === 'dropdown-detail-5'){
        $('#detail-5').slideToggle()
        var videoSrc = 'https://www.youtube.com/embed/vx0jZBEmZcE?rel=0'
            //would be a API call based on muscleMuscle + how to but I can't seem to get the youtube api key working. Would return a video ID that i would add into the embed URL above
        if ($('#video5').attr('class') === 'auto'){
          $('.exerciseVideo5').empty();
        } else {
        $('.exerciseVideo5').html('<iframe id="video5" width="420" height="315" src='+videoSrc+' frameborder="0" allowfullscreen wmode="Opaque"></iframe>')
        $('#video5')[0].src += '&autoplay=1';
        $('#video5').attr('class', 'auto')
        }
        response.preventDefault();
      } else if (response.currentTarget.id === 'exerciseBack'){
        //have a party
      } else {
        console.log("uh oh something went wrong while toggling exercises")
      }
    });
    $('#exerciseBackButton').click(function() {
      $('#exercisecontainer').attr('class', 'list-group hide')
      $('#workoutcontainer').attr('class', 'list-group workout-group')
      $('#dropdown-detail-1').children('.col-xs-10').text('Exercise 1: Please estimate your one rep max!')
      $('#dropdown-detail-2').children('.col-xs-10').text('Exercise 2: Please estimate your one rep max!')
      $('#dropdown-detail-3').children('.col-xs-10').text('Exercise 3: Please estimate your one rep max!')
      $('#dropdown-detail-4').children('.col-xs-10').text('Exercise 4: Please estimate your one rep max!')
      $('#dropdown-detail-5').children('.col-xs-10').text('Exercise 5: Please estimate your one rep max!')
      $('.oneRepAmount').val('')
      if (currentMuscle === 'FullBody'){
        $('.instruction').empty();
        $('.instruction').text('What kind of full body workout are you looking for?');
        // console.log("detected full body")
      } else {
        $('.instruction').empty();
        $('.instruction').text('What kind of '+currentMuscle.toLowerCase()+' workout are you looking for?');
      }
    });
  })();

  function muscleGroupSelection(response){
    $('.workout-group').empty();
    // console.log('that should have removed the list')
    for (var i = 0; i < workoutTypes.length; i++){
      // console.log(workoutTypes[i]);
      if (i < 3) {
        $('.workout-group').append('<a id='+workoutTypes[i].replace(/ /g,'')+response+' class=list-group-item workout-item>'+workoutTypes[i]+'</a>');
      } else {
        $('.workout-group').append('<a id=backToMain class=list-group-item workout-item>'+workoutTypes[i]+'</a>');
      }
      //refactor this
      currentMuscle = response;
      if (currentMuscle === 'FullBody'){
        $('.instruction').empty();
        $('.instruction').text('What kind of full body workout are you looking for?');
        // console.log("detected full body")
      } else {
        $('.instruction').empty();
        $('.instruction').text('What kind of '+response.toLowerCase()+' workout are you looking for?');
      }// console.log('should have added workout type list')
    }
    $('.workout-group').attr('id', "workoutcontainer")
  }

  function workoutTypeSelection(response){
    function toggleViews(){
      $('#exercisecontainer').attr('class', 'list-group');
      $('#workoutcontainer').attr('class', 'list-group workout-group hide');
      $('.instruction').empty();
      $('.instruction').text('Here is your '+currentMuscle.toLowerCase()+' workout to '+response.toLowerCase()+'!');
      $('#onerep').empty();
      currentWorkout = response
      // console.log(currentWorkout)
    }
    // console.log(response);
    if (currentMuscle === 'Back'){
      toggleViews();
      $('#onerep').text('Estimate your current one rep max on the barbell row (lbs)')
    } else if (currentMuscle === 'Chest'){
      toggleViews();
      $('#onerep').text('Estimate your current one rep max on the bench press (lbs)')
    } else if (currentMuscle === 'Leg'){
      toggleViews();
      $('#onerep').text('Estimate your current one rep max on the back squat (lbs)')
    } else if (currentMuscle === 'Core'){
      toggleViews();
      $('#onerep').text('Estimate your current one rep max on the weighted sit up (lbs)')
    } else if (currentMuscle === 'Arm'){
      toggleViews();
      $('#onerep').text('Estimate your current one rep max on the bicep curl (lbs)')
    } else if (currentMuscle === 'Shoulder'){
      toggleViews();
      $('#onerep').text('Estimate your current one rep max on the shoulder press (lbs)')
    } else if (currentMuscle === 'FullBody'){
      $('#exercisecontainer').attr('class', 'container');
      $('#workoutcontainer').attr('class', 'list-group workout-group hide');
      $('.instruction').empty();
      $('.instruction').text('Here is your full body workout to '+response.toLowerCase()+'!');
      $('.onerep').empty();
      $('.onerep').text('Estimate your current one rep max on the deadlift (lbs)')
    } else {
      console.log('something went wrong in the workout selection')
    }
  };

  (function muscleGroupListener(){
    $('.workout-group').on('click', 'a', function(response){
      event.preventDefault();
      // console.log(response)
      // console.log(response.currentTarget.id)
      if ($.inArray(response.currentTarget.id, muscleGroupsNav) !== -1 ){
        muscleGroupSelection(response.currentTarget.id);
        // console.log('found a match in array to navigate to a musclegroup');

      } else if (response.currentTarget.id === 'backToMain') {
        event.preventDefault();
        $('.workout-group').empty();
        for (var i = 0; i < muscleGroups.length; i++){
          $('.workout-group').append('<a id='+muscleGroups[i].replace(/ /g,'')+' class=list-group-item workout-item>'+muscleGroups[i]+'</a>');
        }
        $('.workout-group').attr('id', '');
        $('.instruction').empty();
        $('.instruction').text('What muscle group do you want to work out today?');

      } else if ($.inArray(response.currentTarget.textContent, workoutTypes) !== -1){
        // console.log(response.currentTarget.textContent)
        // console.log('workout selection successful')
        workoutTypeSelection(response.currentTarget.textContent);
      } else {
        console.log('Something went wrong during the workout selection process')
      }
    });
  })();
});
