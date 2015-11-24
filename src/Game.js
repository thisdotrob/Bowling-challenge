function Game(newFrameConstructor) {
  this._frames = [];
  this._newFrameConstructor = newFrameConstructor;
  this._currentFrame = newFrameConstructor();
  this._lastRoll = null;
}

Game.prototype.frames = function() {
  return this._frames;
}

Game.prototype.roll = function(pinsDown) {
  if(this._gameOver()) {
    throw new Error('No rolls left');
  }
  this._currentFrame.roll(pinsDown);
  this._setLastRoll(pinsDown);
  if (this._currentFrame.isComplete()) {
    this._startNextFrame();
  }
}

Game.prototype.lastRoll = function() {
  return this._lastRoll;
}

Game.prototype._setLastRoll = function (pins) {
  this._lastRoll = pins;
}

Game.prototype.rollWithAccuracy = function(accuracy) {
  var pinsLeft = this._currentFrame.pinsLeft();
  var pinsDown = Math.round(pinsLeft * accuracy);
  this.roll(pinsDown);
}

Game.prototype.score = function() {
  var scores = 0;
  var numFramesToSum = this._frames.length > 10 ? 10 : this._frames.length;
  for(var i = 0; i < numFramesToSum; i++) {
    console.log("Frame " + i + " score: ")
    scores = scores + this._frames[i].score();
  }
  return scores;
}

Game.prototype.pinsLeft = function() {
  return this._currentFrame.pinsLeft();
}

Game.prototype.isMidFrame = function() {
  return this._currentFrame.isMidFrame();
}

Game.prototype._startNextFrame = function() {
  var nextFrame = this._newFrameConstructor();
  this._currentFrame.setNextFrame(nextFrame);
  this._storeCurrentFrame();
  this._currentFrame = nextFrame;
}

Game.prototype._storeCurrentFrame = function() {
  this._frames.push(this._currentFrame);
}

Game.prototype._gameOver = function() {
  var length = this.frames().length;
  if (length < 10) {
    return false;
  }
  if (length === 10 && this._tenthFrameIsStrike) {
    return false;
  }
  if (length === 10 && this._tenthFrameIsSpare) {

  }
}

Game.prototype._gameOver = function() {
  var frames = this.frames();
  if(frames.length === 10) {
    return !this._lastFrameIsStrike();
  }
  if(frames.length === 11 && this._lastFrameIsStrike()) {
    return typeof this._currentFrame.firstRoll() !== 'undefined';
  }
  return false
}

Game.prototype._lastFrameIsStrike = function() {
  return this._frames[this._frames.length - 1].isStrike();
}
