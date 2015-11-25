$(document).ready(function(){
  var roll = 0;
  var rollScore = 0;

  $('#roll_button').click(function(){

    var accuracy = $('#accuracy_field').val();
    var pinsDown = Math.round(parseFloat(accuracy) * 10);
    rollScore += pinsDown;

    if(roll === 0){
      if (pinsDown === 10) {
        $('#frame0right').text('x');
      } else {
        $('#frame0left').text(pinsDown);
      }
    }

    if (roll === 1) {
      if(rollScore === 10){
          pinsDown = '/';
      }
      $('#frame0right').text(pinsDown);
    }

    roll += 1;

  });
});
