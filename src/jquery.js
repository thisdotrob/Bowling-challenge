$(document).ready(function(){
  timer = setInterval(moveBlob, 10);
  updateScoreDisplay();
  $('#stop_button').on('click', function(){
    clearInterval(timer);
    roll();
    timer = setInterval(moveBlob, 1);
  })
})

var frameConstructor = function(){ return new Frame(); }
var game = new Game(frameConstructor);

var blobMargin = 0;
var increment = 2;
var pinsLeft = 10;

function moveBlob(){
  blobMargin += increment;
  if (blobMargin === 290 || blobMargin === 0) { increment = -increment; }
  $('#swing_blob').css('margin-left',blobMargin);
}

function roll(){
  var varianceFromCenter = Math.abs(blobMargin-150);
  var accuracy = 1 - varianceFromCenter/150
  game.rollWithAccuracy(accuracy);
  if (!game.isMidFrame()){
    updateScoreDisplay();
  }
  updateRollsDisplay(game.lastRoll());
  updatePinsLeftDisplay();
}

function updateScoreDisplay(){
  var score = game.score();
  if (typeof score === 'undefined') { score = 0 }
  $('#score_display').text(score);
}

function updateRollsDisplay(pinsDown){
  $("#rolls_list").append("<li>You rolled: " + pinsDown + "</li>");
}

function updatePinsLeftDisplay(){
  var text = "";
  if (game.isMidFrame()){
    text = "Pins left: " + game.pinsLeft();
  }
  $('#pins_left_display').text(text);
}
