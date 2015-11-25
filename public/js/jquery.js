$(document).ready(function(){
  $('#roll_button').click(function(){
    var accuracy = $('#accuracy_field').val();
    var pinsDown = Math.round(parseFloat(accuracy) * 10);
    if (pinsDown === 10) {
      $('#frame0right').text('x');
    } else {
      $('#frame0left').text(pinsDown);
    }
  });
});
