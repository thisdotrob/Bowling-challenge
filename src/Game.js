'use strict';

function Game() {
    this._frames = [];
}

Game.prototype.frames = function(){
  return this._frames;
}

Game.prototype.roll = function(pinsKnockedDown){
  if(this._noFramesLeft()){
    throw new Error('No frames left');
  }
  if(pinsKnockedDown > 10 || pinsKnockedDown < 0){
    throw new Error('Invalid number of pins knocked down');
  }
  this._frames.push(pinsKnockedDown);
}

Game.prototype.score = function(){
  return this._calculateScore();
}

Game.prototype._calculateScore = function(){
  var score = 0;
  var frames = this._frames;
  for(var i = 0; i < frames.length; i++){
    var multiplier;
    if (frames[i-1] === 10 || frames[i-2] === 10){
      multiplier = 2;
    } else{
      multiplier = 1;
    }
    score = score + frames[i] * multiplier;
  }
  return score;
}

Game.prototype._noFramesLeft = function(){
  return this._frames.length >= 20 ? true : false;
}
